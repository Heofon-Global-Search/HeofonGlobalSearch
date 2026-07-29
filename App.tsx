import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import SpaceBackground from '@/components/SpaceBackground';
import NavBar from '@/components/NavBar';
import Home from '@/pages/Home';
import SearchResults from '@/pages/SearchResults';
import Heonews from '@/pages/Heonews';
import Heotranslate from '@/pages/Heotranslate';
import Heopad from '@/pages/Heopad';
import Heomaps from '@/pages/Heomaps';
import Heofeedback from '@/pages/Heofeedback';
import Settings from '@/pages/Settings';
import About from '@/pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen relative overflow-x-hidden">
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
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
