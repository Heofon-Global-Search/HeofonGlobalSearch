import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import SearchResults from "./SearchResults";
import Heonews from "./Heonews";
import Heotranslate from "./Heotranslate";
import Heopad from "./Heopad";
import Heomaps from "./Heomaps";
import Heofeedback from "./Heofeedback";
import Settings from "./Settings";
import About from "./About";

import NavBar from "./NavBar";
import SpaceBackground from "./SpaceBackground";


export default function App() {

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-background text-foreground">

        <SpaceBackground />

        <NavBar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/search" element={<SearchResults />} />

          <Route path="/heonews" element={<Heonews />} />

          <Route path="/heotranslate" element={<Heotranslate />} />

          <Route path="/heopad" element={<Heopad />} />

          <Route path="/heomaps" element={<Heomaps />} />

          <Route path="/heofeedback" element={<Heofeedback />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/about" element={<About />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}
