require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const { getJson } = require("serpapi");
const OpenAI = require("openai");

const Article = require("../models/article.model");

// DB
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected");
}

// Scrape article content
async function scrape(url) {
  const { data } = await axios.get(url, { timeout: 15000 });
  const $ = cheerio.load(data);
  return $("article").text().trim().slice(0, 4000);
}

// Google search
function googleSearch(title) {
  return new Promise((resolve, reject) => {
    getJson(
      {
        q: title,
        api_key: process.env.SERP_API_KEY,
        num: 5
      },
      res => {
        if (!res.organic_results) reject("No results");
        resolve(res.organic_results);
      }
    );
  });
}

// LLM rewrite
async function rewrite(original, ref1, ref2) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const prompt = `
Rewrite this article using better SEO and structure.

ORIGINAL:
${original}

REFERENCE 1:
${ref1}

REFERENCE 2:
${ref2}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return res.choices[0].message.content;
}

// MAIN
async function run() {
  await connectDB();

  const articles = await Article.find({ isUpdated: false });

  for (const article of articles) {
    console.log("Processing:", article.title);

    const results = await googleSearch(article.title);
    const links = results
      .map(r => r.link)
      .filter(l => !l.includes("beyondchats"))
      .slice(0, 2);

    if (links.length < 2) continue;

    const ref1 = await scrape(links[0]);
    const ref2 = await scrape(links[1]);

    const updated = await rewrite(article.content, ref1, ref2);

    article.content = updated;
    article.references = links;
    article.isUpdated = true;

    await article.save();
    console.log("Updated:", article.title);
  }

  await mongoose.disconnect();
  console.log("DONE");
}

run();
