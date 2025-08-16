const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { extractTextFromImage } = require('../services/ocr');
const { analyzeSentiment } = require('../services/gemini');
const { saveAnalysis } = require("../services/firestore");

const router = express.Router();

// Configuración de Multer para guardar imágenes temporalmente
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
// Linea para comprobar que la ruta recibe la imagen
//console.log("Archivo recibido:", req.file);

  try {
    const path = require('path');
    const imagePath = path.resolve(req.file.path);
    //console.log("Ruta absoluta de la imagen:", imagePath);

    const { patient_id } = req.body;

    if (!patient_id) {
      return res.status(400).json({ error: "Falta el campo 'patient_id'" });
    }

    // 1️⃣ Extraer texto con OCR
    const extractedText = await extractTextFromImage(imagePath);
    console.log("Texto extraído por OCR:", extractedText);


    // 2️⃣ Pasar el texto a Gemini para análisis de sentimientos
    const sentimentResult = await analyzeSentiment(extractedText, patient_id);

    // Eliminar el archivo temporal
    fs.unlinkSync(imagePath);

    // Guardar en Firestore
    const saved = await saveAnalysis(patient_id, {
      text_original: extractedText,
      source: "ocr",
      sentiment_result: sentimentResult,
    });

    res.json(saved);

  } catch (error) {
    res.status(500).json({ error: 'Error procesando OCR', detalle: error.message });
  }
});

module.exports = router;
