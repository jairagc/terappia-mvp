const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { extractTextFromImage } = require('../services/ocr');
const { analyzeSentiment } = require('../services/gemini');

const router = express.Router();

// Configuración de Multer para guardar imágenes temporalmente
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
// Linea para comprobar que la ruta recibe la imagen
 console.log("Archivo recibido:", req.file);

  try {
    const path = require('path');
    const imagePath = path.resolve(req.file.path);
    console.log("Ruta absoluta de la imagen:", imagePath);

    // 1️⃣ Extraer texto con OCR
    const extractedText = await extractTextFromImage(imagePath);
    console.log("Texto extraído por OCR:", extractedText);


    // 2️⃣ Pasar el texto a Gemini para análisis de sentimientos
    const sentimentResult = await analyzeSentiment(extractedText, 'paciente_ocr');

    // Eliminar el archivo temporal
    fs.unlinkSync(imagePath);

    res.json({
      ocr_text: extractedText,
      sentiment_analysis: sentimentResult,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error procesando OCR', detalle: error.message });
  }
});

module.exports = router;
