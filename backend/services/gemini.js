/**
 * Servicio para conectarse a la API de Gemini Flash y realizar análisis de sentimientos.
 * 
 * Librerías usadas:
 * - @google/generative-ai: SDK oficial para comunicarse con los modelos Gemini de Google.
 * - dotenv: para leer la clave API desde variables de entorno.
 */

// Importamos librerías necesarias
require("dotenv").config(); // Carga variables desde .env
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializamos cliente de Gemini usando la clave API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Función que envía un texto a Gemini Flash y obtiene un análisis ABSA.
 * @param {string} text - Texto a analizar.
 * @param {string} patientId - ID del paciente.
 * @returns {Promise<Object>} - Objeto JSON con el análisis.
 */
async function analyzeSentiment(text, patientId) {
  // Definimos el prompt maestro
  const prompt = `
Eres un asistente especializado en salud mental.
Analiza el siguiente texto escrito por un paciente usando ABSA (Aspect-Based Sentiment Analysis).
1. Identifica aspectos relevantes como: estado de ánimo, relaciones, motivación, conducta, sueño, apetito, energía.
2. Para cada aspecto:
   - emoción principal (alegría, tristeza, enojo, miedo, asco, sorpresa, ansiedad, apatía, euforia, calma)
   - polaridad (positivo, negativo o neutral)
   - confianza (0 a 1)
3. Detecta indicadores de riesgo: ideación suicida, autolesiones, uso de sustancias.
4. Devuelve SOLO un JSON válido con el siguiente formato:
{
  "patient_id": "<string>",
  "timestamp": "<ISO8601 datetime>",
  "texto_original": "<string>",
  "analysis": [
    {
      "aspect": "<string>",
      "emotion": "<string>",
      "sentiment": "<positivo|negativo|neutral>",
      "confidence": <number>
    }
  ],
  "risk_indicators": {
    "suicidal_ideation": <true|false>,
    "self_harm": <true|false>,
    "substance_use": <true|false>
  }
}

Texto: ${text}
`;

  // Seleccionamos el modelo Gemini Flash
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Enviamos la solicitud a la API
  const result = await model.generateContent(prompt);

  // Obtenemos texto de la respuesta
  const rawText = result.response.text();
  console.log("Respuesta cruda de Gemini:", rawText);

  // Limpieza para extraer solo el JSON
  const jsonStart = rawText.indexOf("{");
  const jsonEnd = rawText.lastIndexOf("}");
  const jsonString = rawText.substring(jsonStart, jsonEnd + 1);

  // Intentamos convertirlo a JSON
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error al parsear JSON de Gemini:", error);
    throw new Error("Respuesta de Gemini no es JSON válido");
  }
}

// Exportamos la función para usarla en las rutas
module.exports = { analyzeSentiment };
