import SentimentTester from "./SentimentTester";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        TerappIA - Prueba de Análisis de Sentimientos
      </h1>
      <SentimentTester />
    </div>
  );
}

export default App;
