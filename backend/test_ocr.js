const vision = require('@google-cloud/vision');
const path = require('path');

async function testOCR() {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, 'credentials', 'vision-key.json'),
  });

  const imagePath = path.join(__dirname, 'uploads', 'nota-prueba1.png');

  try {
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;
    console.log("Detecciones:", detections);
    console.log("Texto detectado:", detections[0] ? detections[0].description : '(sin texto)');
  } catch (err) {
    console.error("Error en OCR:", err);
  }
}

testOCR();
