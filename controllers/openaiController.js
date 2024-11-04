const { OpenAIApi, Configuration } = require("openai");

const openai = new OpenAIApi(new Configuration({
    apiKey: "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",
  }));
  


const getAIResponse = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });
    res.json({ aiResponse: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error with OpenAI API:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Unable to fetch response from AI." });
  }
};

module.exports = { getAIResponse };
