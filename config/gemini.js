import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.GEMINI_API
const ai = new GoogleGenAI({ apiKey: apiKey });

async function main(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        console.log(response);
        return response.text
    } catch (error) {
        console.log(error)
    }
}

export default main