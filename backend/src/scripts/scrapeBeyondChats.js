require("dotenv").config();

const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Article = require("../models/article.model");

// ---------- DB CONNECTION ----------
async function connectDB() {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection failed");
    console.error(err);
    process.exit(1);
  }
}

// ---------- SCRAPING LOGIC ----------
async function scrapeBeyondChats() {
  try {
    const baseUrl = "https://beyondchats.com";

    // 🔴 IMPORTANT: use paginated page for older blogs
    const { data } = await axios.get(`${baseUrl}/blogs/page/2/`);
    const $ = cheerio.load(data);

    // collect blog article links
    let links = $("a[href^='/blogs/']")
      .map((i, el) => baseUrl + $(el).attr("href"))
      .get();

    // remove duplicates and listing page
    links = [...new Set(links)].filter(
      link => link !== `${baseUrl}/blogs/`
    );

    // take only 5 oldest
    links = links.slice(-5);

    console.log(`Found ${links.length} article links`);

    for (const link of links) {
      console.log("Scraping:", link);

      // skip duplicates
      const exists = await Article.findOne({ sourceUrl: link });
      if (exists) {
        console.log("Already exists, skipping");
        continue;
      }

      const page = await axios.get(link);
      const $$ = cheerio.load(page.data);

      const title = $$("h1").first().text().trim();
      const content = $$("article").text().trim();

      if (!title || !content) {
        console.log("Invalid article, skipping:", link);
        continue;
      }

      await Article.create({
        title,
        content,
        sourceUrl: link,
        isUpdated: false,
        references: []
      });

      console.log("Saved article:", title);
    }

    console.log("Scraping completed successfully");
  } catch (err) {
    console.error("Scraping failed");
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("DB disconnected");
    process.exit(0);
  }
}

// ---------- RUN ----------
(async () => {
  await connectDB();
  await scrapeBeyondChats();
})();
