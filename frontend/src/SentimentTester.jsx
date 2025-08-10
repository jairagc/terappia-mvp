import { useState } from "react";
import axios from "axios";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

export default function SentimentTester() {
  const [inputText, setInputText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeText = async () => {
    if (!inputText.trim()) return setError("Escribe un texto antes de analizar.");
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:3001/sentiment", {
        text: inputText,
        patient_id: "paciente_prueba",
      });
      setResult(response.data);
    } catch {
      setError("Ocurrió un error en el análisis de texto.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeImage = async () => {
    if (!imageFile) return setError("Sube una imagen antes de analizar.");
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post("http://localhost:3001/ocr", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch {
      setError("Ocurrió un error en el análisis de imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-blue-700">Análisis de Sentimientos (Gemini + OCR)</h1>

        {/* Texto manual */}
        <textarea
          className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="5"
          placeholder="Escribe aquí el texto a analizar..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button
          onClick={analyzeText}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Analizando..." : "Analizar texto"}
        </button>

        {/* Subir imagen */}
        <div className="border-t pt-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mb-2"
          />
          <button
            onClick={analyzeImage}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Procesando imagen..." : "Analizar imagen"}
          </button>
        </div>

        {/* Errores */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Resultado */}
        {result && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Resultado</h2>
            <JSONPretty data={result} />
          </div>
        )}
      </div>
    </div>
  );
}
