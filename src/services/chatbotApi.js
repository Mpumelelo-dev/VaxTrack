export const CHATBOT_MODEL = "gpt-5.4-nano";

const CHAT_API_URL = process.env.REACT_APP_CHAT_API_URL || "/api/chat";

export async function askVaccineAssistant(messages) {
  const response = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: CHATBOT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a careful vaccination assistant for parents. Give short, practical answers. Do not diagnose medical conditions. Tell users to contact a qualified health professional for personal medical advice or urgent concerns.",
        },
        ...messages.map((message) => ({
          role: message.from === "user" ? "user" : "assistant",
          content: message.text,
        })),
      ],
    }),
  });

  if (!response.ok) {
    let errorMessage = "Chat request failed";

    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (error) {
      errorMessage = response.statusText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();

  return data.reply || data.output_text || "I could not get an answer right now.";
}
