
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MODEL_TEXT_GENERATION } from "../constants";

// IMPORTANT: The API_KEY is expected to be set in the environment.
// For client-side SPAs without a build step to replace `process.env.API_KEY`,
// this might not work as expected. The key needs to be available in the
// execution context. For example, it could be injected via a script tag
// or a build process. This implementation assumes `process.env.API_KEY` is accessible.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn(
    "Gemini API Key not found in process.env.API_KEY. AI features will be disabled or may fail. Ensure the API key is correctly configured in your environment."
  );
}

export const generateBookDescription = async (title: string, author: string): Promise<string> => {
  if (!ai) {
    return "AI service is unavailable (API key not configured). Please add a description manually.";
  }
  try {
    const prompt = `Generate a concise and engaging book description (around 50-70 words) for a book titled "${title}" by author "${author}". Focus on the potential themes or a captivating hook. Do not use introductory phrases like "Here's a description:". Just provide the description text itself.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_TEXT_GENERATION,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating book description via Gemini API:", error);
    // Provide a more specific error message if possible
    if (error instanceof Error && error.message.includes("API key not valid")) {
        return "AI service error: API key is not valid. Please check your configuration.";
    }
    return "Could not generate description due to an AI service error. Please add manually.";
  }
};
