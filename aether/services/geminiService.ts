import { GoogleGenAI, Type } from "@google/genai";
import { StylistResponse } from '../types';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStylistAdvice = async (userInput: string): Promise<StylistResponse> => {
  const modelId = "gemini-2.5-flash"; // Fast model for interactive UI

  const systemInstruction = `
    You are 'Aether AI', a world-class fashion stylist for the luxury brand AETHER.
    Your tone is sophisticated, minimalist, and poetic.
    You advise users on outfits based on their mood, occasion, or weather.
    Keep suggestions high-fashion and avant-garde.
    
    The user will provide a context (e.g., "dinner in Paris", "rainy monday").
    You must return a structured JSON response.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userInput,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            outfitName: { type: Type.STRING, description: "A poetic name for the look" },
            description: { type: Type.STRING, description: "A vivid description of the ensemble" },
            keyItems: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3-4 specific clothing items" 
            },
            stylingTip: { type: Type.STRING, description: "One specific tip on how to wear it (e.g., rolling sleeves, tucking)" }
          },
          required: ["outfitName", "description", "keyItems", "stylingTip"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No advice generated.");
    }

    return JSON.parse(text) as StylistResponse;

  } catch (error) {
    console.error("Gemini Stylist Error:", error);
    // Fallback response in case of API issues or limits
    return {
        outfitName: "The Default Void",
        description: "We are currently unable to connect to the digital ether. However, simplicity never fails.",
        keyItems: ["Black Turtleneck", "Tailored Trousers", "Leather Boots"],
        stylingTip: "Keep lines clean and posture straight."
    };
  }
};
