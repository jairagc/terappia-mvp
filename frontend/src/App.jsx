import { Routes, Route, Link } from "react-router-dom";
import SentimentTester from "./SentimentTester";
import HistoryViewer from "./HistoryViewer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Barra de navegación */}
      <nav className="bg-blue-700 text-white p-4 shadow-lg flex space-x-6">
        <Link to="/" className="hover:underline">
          Analizador
        </Link>
        <Link to="/history" className="hover:underline">
          Historial
        </Link>
      </nav>

      {/* Contenido de cada vista */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<SentimentTester />} />
          <Route path="/history" element={<HistoryViewer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
