import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Settings from "./Settings";
import NavBar from "./NavBar";
import SearchResults from "./SearchResults";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/search"
            element={<SearchResults />}
          />

          <Route
            path="*"
            element={<Home />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
