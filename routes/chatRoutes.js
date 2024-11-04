const express = require("express");
const { getAIResponse } = require("../controllers/openaiController");

const router = express.Router();
router.post("/ai-response", getAIResponse);

module.exports = router;
