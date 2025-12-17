import { useEffect } from "react";
import { testBackend } from "./api/api";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-indigo-600">
          Tailwind v4 is working 🚀
        </h1>
        <p className="mt-4 text-gray-600">
          If this is styled, setup is correct.
        </p>
      </div>
    </div>
  );
}

export default App;
