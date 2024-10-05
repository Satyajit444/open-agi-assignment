import axios from "axios";

const API_KEY =
  "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";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getOpenAIResponse = async (prompt) => {
  console.log("🚀 ~ getOpenAIResponse ~ prompt:", prompt);
  const response = await openai.post("/completions", {
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 100,
  });
  return response.data;
};
