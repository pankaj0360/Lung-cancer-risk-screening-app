import { GEMINI_API_KEY } from "../config/apiConfig";

export const sendMessageApi = async (userMessage: string) => {

  const prompt = `
You are a health and personal assistant.

User says: ${userMessage}

Give health advice.
Do not give harmful or misleading info.
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not understand."
    );

  } catch (error) {
    return "Server error. Try again.";
  }
};