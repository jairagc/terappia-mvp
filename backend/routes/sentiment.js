/**
 * Ruta de análisis de sentimientos.
 * 
 * Librerías usadas:
 * - express: para definir rutas y manejar solicitudes/respuestas.
 * - Nuestro servicio gemini.js: para procesar el texto con Gemini Flash.
 */

const express = require("express");
const router = express.Router();
const { analyzeSentiment } = require("../services/gemini");
const { saveAnalysis } = require("../services/firestore");

// Ruta POST /sentiment
router.post("/", async (req, res) => {
  /**
   * Esperamos que el cuerpo de la solicitud contenga:
   * {
   *   "text": "texto del paciente",
   *   "patient_id": "id123"
   * }
   */
  const { text, patient_id } = req.body;

  // Validación básica de entrada
  if (!text || !patient_id) {
    return res.status(400).json({ error: "Faltan campos requeridos: text, patient_id" });
  }

  try {
    // Llamamos a la función que analiza el sentimiento
    const analysis = await analyzeSentiment(text, patient_id);

    // Guardar en Firestore
    const saved = await saveAnalysis(patient_id, {
      text_original: text,
      source: "manual",
      sentiment_result: analysis,
    });

    // Respondemos al cliente con el análisis obtenido
    res.json(saved);
  } catch (error) {
    console.error("Error en /sentiment:", error);
    res.status(500).json({ error: "Error procesando el análisis", detalle: error.message });
  }
});

module.exports = router;
