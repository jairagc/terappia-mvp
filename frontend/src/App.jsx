import { useState } from "react";
import axios from "axios";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css"; // Tema con colores agradables

export default function SentimentTester() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeText = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:3001/sentiment", {
        text: inputText,
        patient_id: "paciente_prueba",
      });
      setResult(response.data);
    } catch (err) {
      setError("Ocurrió un error en el análisis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Análisis de Sentimientos (Gemini)
        </h1>

        <p className="text-gray-600 mb-4">
          Escribe un texto para analizar su contenido emocional y de riesgo.
        </p>

        <textarea
          className="w-full border border-blue-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {loading ? "Analizando..." : "Analizar"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {result && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Resultado del Análisis
            </h2>
            <JSONPretty data={result} />
          </div>
        )}
      </div>
    </div>
  );
}
