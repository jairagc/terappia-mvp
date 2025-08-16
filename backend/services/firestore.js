/**
 * Servicio para interactuar con Firestore.
 */
const admin = require("firebase-admin");
const path = require("path");

// Inicializa Firebase con la clave de servicio
const serviceAccount = require(path.join(__dirname, "../credentials/firebase-key.json"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

/**
 * Guarda un análisis de sentimientos en la colección de un paciente.
 * @param {string} patientId - ID del paciente
 * @param {Object} data - Datos del análisis
 */
async function saveAnalysis(patientId, data) {
  const docRef = db
    .collection("patients")
    .doc(patientId)
    .collection("analyses")
    .doc(); // ID automático

  const payload = {
    text_original: data.text_original,
    source: data.source,
    sentiment_result: data.sentiment_result,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };

  await docRef.set(payload);
  return { patient_id: patientId, id: docRef.id, ...payload };
}

/**
 * Recupera todos los análisis de un paciente ordenados por fecha.
 * @param {string} patientId - ID del paciente
 */
async function getAnalysesByPatient(patientId) {
  const snapshot = await db
    .collection("patients")
    .doc(patientId)
    .collection("analyses")
    .orderBy("timestamp", "desc")
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

module.exports = { saveAnalysis, getAnalysesByPatient };
