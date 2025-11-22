import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Message, Tone, User } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

// Helper to format conversation for the AI
const formatConversationHistory = (messages: Message[], otherUser: User): string => {
  return messages.map(m => {
    const sender = m.isOwn ? "Me (The User)" : `${otherUser.name}`;
    return `${sender}: "${m.text}"`;
  }).join("\n");
};

export const generateSmartReplies = async (messages: Message[], otherUser: User): Promise<string[]> => {
  if (!messages || messages.length === 0) return [];

  const history = formatConversationHistory(messages.slice(-10), otherUser); // Last 10 messages context

  const prompt = `
    You are an AI assistant for Instagram Direct Messages.
    Read the following conversation history and suggest 3 distinct, short, natural, and engaging replies that I (The User) could send back to ${otherUser.name}.
    
    Context:
    ${history}

    Constraints:
    - Replies should be casual but polite, suitable for Instagram.
    - Keep them under 15 words.
    - Do not include hashtags.
    - Do not use quotes in the output.
  `;

  const responseSchema: Schema = {
    type: Type.ARRAY,
    items: { type: Type.STRING },
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Slightly creative
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const replies = JSON.parse(jsonText) as string[];
    return replies;
  } catch (error) {
    console.error("Error generating smart replies:", error);
    return ["Sounds good!", "Interesting!", "Tell me more."]; // Fallbacks
  }
};

export const rewriteMessage = async (originalText: string, tone: Tone): Promise<string> => {
  const prompt = `
    Rewrite the following text message to have a "${tone}" tone.
    Keep the meaning the same, but change the style. 
    Return ONLY the rewritten text as a raw string, no JSON, no quotes.

    Original Text: "${originalText}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
         // No JSON schema needed for simple string return, but let's keep it simple
         temperature: 0.8
      }
    });

    return response.text?.trim() || originalText;
  } catch (error) {
    console.error("Error rewriting message:", error);
    return originalText;
  }
};
