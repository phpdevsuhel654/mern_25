const axios = require("axios");

exports.fetchRandomQuote = async () => {
  try {
    // Primary API
    const response = await axios.get("https://zenquotes.io/api/random");
    const data = response.data[0];

    return {
      content: data.q,
      author: data.a,
    };
  } catch (error) {
    console.log("Primary API failed, using fallback...");

    // Fallback API
    const fallback = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": process.env.NINJA_API_KEY,
      },
    });

    return {
      content: fallback.data[0].quote,
      author: fallback.data[0].author,
    };
  }
};