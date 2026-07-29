import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Routes>
          <Route
            path="*"
            element={
              <div className="text-center">
                <h1 className="text-7xl font-black text-blue-400">
                  Heofon
                </h1>
                <p className="mt-4 text-gray-400">
                  Website is loading correctly
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
