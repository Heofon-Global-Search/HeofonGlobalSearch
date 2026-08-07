import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <div style={{
              background: "black",
              color: "white",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}>
              <h1 style={{fontSize: "70px"}}>
                Heofon
              </h1>

              <p>
                App.tsx is working
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
