const axios = require("axios");
const search = require("../services/googleSearch");
const scrape = require("../services/contentScraper");
const llm = require("../services/llm");

async function run() {
  const { data: articles } = await axios.get("http://localhost:5000/articles");

  const article = articles.find(a => !a.isUpdated);
  if (!article) return;

  const links = await search.search(article.title);
  const ref1 = await scrape.scrapeContent(links[0]);
  const ref2 = await scrape.scrapeContent(links[1]);

  const updated = await llm.rewrite(article.content, ref1, ref2);

  await axios.put(`http://localhost:5000/articles/${article._id}`, {
    content: updated,
    isUpdated: true,
    references: links
  });

  console.log("Article updated");
}

run();
