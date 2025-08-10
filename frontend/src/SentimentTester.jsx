import React, { useState } from "react";
import axios from "axios";

export default function SentimentTester() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:3001/sentiment", {
        text,
        patient_id: "paciente_demo",
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "No se pudo analizar el texto" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
      <textarea
        className="w-full border border-gray-300 rounded p-3 mb-4"
        rows={4}
        placeholder="Escribe el texto a analizar..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Analizando..." : "Analizar Sentimientos"}
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Resultado:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
