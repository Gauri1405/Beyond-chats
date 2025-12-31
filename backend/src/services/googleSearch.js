const axios = require("axios");

exports.search = async (query) => {
  const res = await axios.get("https://serpapi.com/search", {
    params: {
      q: query,
      api_key: process.env.SERP_API_KEY,
      num: 2
    }
  });

  return res.data.organic_results.slice(0, 2).map(r => r.link);
};
