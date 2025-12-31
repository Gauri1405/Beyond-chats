const axios = require("axios");

exports.rewrite = async (original, ref1, ref2) => {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: `
Rewrite this article based on references.

Original:
${original}

Ref1:
${ref1}

Ref2:
${ref2}
        `
      }]
    },
    { headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` } }
  );

  return res.data.choices[0].message.content;
};
