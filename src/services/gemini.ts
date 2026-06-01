import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function sendMessageToGemini(text: string, lang: 'en' | 'rw') {
  const langNote = lang === 'rw'
    ? ' Please respond in Kinyarwanda.'
    : ' Please respond in English.';

  const systemInstruction = `You are YIGA Health, a compassionate and knowledgeable sexual and reproductive health (SRH) assistant designed for Rwandan youth aged 15–30. Your role is to provide accurate, non-judgmental, culturally sensitive health information.

Key guidelines:
- Be warm, empathetic, and non-judgmental — like a trusted older sibling
- Provide accurate SRH information: contraception, HIV/STIs, menstrual health, pregnancy, consent
- Reference Rwanda-specific resources when relevant (ARBEF, RBC, UNAIDS Rwanda)
- For urgent or serious medical concerns, gently encourage visiting a clinic
- Never shame or judge the user's questions or situation
- Keep responses clear and accessible (not overly clinical)
- Respect anonymity — never ask for personal identifying information
- If asked about something outside health, gently redirect to health topics
- Use a friendly tone.
${langNote}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}
