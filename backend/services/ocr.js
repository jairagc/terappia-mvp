/**
 * Servicio para usar Google Cloud Vision y extraer texto de imágenes.
 */
const vision = require('@google-cloud/vision');

// Inicializa el cliente con la clave descargada
const path = require('path');
const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, '..', 'credentials', 'vision-key.json'),
});


async function extractTextFromImage(filePath) {
  const [result] = await client.textDetection(filePath);
  const detections = result.textAnnotations;
  return detections[0] ? detections[0].description : '';
}

module.exports = { extractTextFromImage };
