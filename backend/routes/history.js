const express = require("express");
const { getAnalysesByPatient } = require("../services/firestore");

const router = express.Router();

router.get("/:patient_id", async (req, res) => {
  try {
    const patientId = req.params.patient_id;
    const analyses = await getAnalysesByPatient(patientId);
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo historial", detalle: error.message });
  }
});

module.exports = router;
