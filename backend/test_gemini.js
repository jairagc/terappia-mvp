//Codigo para probar el funcionamiento correcto del servicio de Gemini
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = "Devuelve un JSON: {\"mensaje\":\"Hola\"}";
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

test();
