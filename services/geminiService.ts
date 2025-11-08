import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Question, Difficulty } from "../types.ts";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("Missing Gemini API Key");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const quizSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        q: { type: Type.STRING, description: "The question text." },
        a: { type: Type.STRING, description: "Option A." },
        b: { type: Type.STRING, description: "Option B." },
        c: { type: Type.STRING, description: "Option C." },
        d: { type: Type.STRING, description: "Option D." },
        correct: { type: Type.STRING, description: "The correct option key (a, b, c, or d)." },
      },
      required: ["q", "a", "b", "c", "d", "correct"],
    },
};


export const generateQuiz = async (topic: string, difficulty: Difficulty): Promise<Question[]> => {
  const prompt = `Generate exactly 10 multiple-choice questions about ${topic}. The difficulty level should be ${difficulty}. Return ONLY the valid JSON array of questions. Do not include any other text, explanation, or markdown formatting. The JSON must strictly adhere to the provided schema.`;

  let response: GenerateContentResponse | undefined;
  try {
    response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Using flash for speed and cost-efficiency
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
        temperature: 0.3, // Lower temperature for more deterministic and reliable JSON
      },
    });
    
    const text = response.text.trim();
    const questions = JSON.parse(text);

    if (!Array.isArray(questions) || questions.length !== 10) {
      const count = Array.isArray(questions) ? questions.length : 'not an array';
      console.error(`Expected 10 questions, but received ${count}.`, questions);
      throw new Error(`The AI generated an invalid number of questions (${count}). Please try a different topic or try again.`);
    }
    
    // Validate each question and normalize the 'correct' field.
    return (questions as Partial<Question>[]).map(q => {
      if (!q || !q.q || !q.a || !q.b || !q.c || !q.d || !q.correct) {
        console.error('Invalid question object from AI:', q);
        throw new Error('The AI returned a question with missing fields.');
      }

      const correct = q.correct.trim().toLowerCase();
      if (!['a', 'b', 'c', 'd'].includes(correct)) {
        console.error('Invalid "correct" value from AI:', q);
        throw new Error(`The AI returned a question with an invalid 'correct' answer key: "${q.correct}".`);
      }
      
      return {
        q: q.q,
        a: q.a,
        b: q.b,
        c: q.c,
        d: q.d,
        correct: correct as 'a' | 'b' | 'c' | 'd'
      };
    });
    
  } catch (error) {
    console.error("Error generating quiz:", error);
    if (error instanceof SyntaxError) {
      console.error("Failed to parse Gemini response as JSON:", response?.text);
      throw new Error("The AI returned a response in an unexpected format. Please try again.");
    }
    // Re-throw specific errors, or a generic one
    const errorMessage = error instanceof Error ? error.message : "Failed to generate the quiz. The topic might be too specific or there was an issue with the AI. Please try again.";
    throw new Error(errorMessage);
  }
};