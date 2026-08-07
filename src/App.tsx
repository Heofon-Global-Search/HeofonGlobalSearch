import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Settings from "./Settings";
import SearchResults from "./SearchResults";
import NavBar from "./NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
