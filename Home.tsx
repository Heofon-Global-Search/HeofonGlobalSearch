import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import TrendingTags from "./TrendingTags";
import QuickLinks from "./QuickLinks";
import Stats from "./Stats";
import SocialsSection from "./SocialsSection";

export default function Home() {
  const navigate = useNavigate();

  function handleSearch(query: string) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <main className="relative z-10 min-h-screen">

      <section className="min-h-screen flex flex-col items-center justify-center px-4">

        <h1
          className="text-7xl md:text-9xl font-black mb-8 tracking-tight"
          style={{
            background:
              "linear-gradient(90deg, #00d4ff, #6366f1, #c026d3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Heofon
        </h1>

        <p className="text-center text-gray-400 mb-8 max-w-xl">
          Privacy-first global search built for a safer web.
        </p>

        <div className="w-full max-w-3xl space-y-6">
          <SearchInput onSearch={handleSearch} />

          <TrendingTags onTagClick={handleSearch} />

          <QuickLinks />

          <Stats />
        </div>

      </section>

      <SocialsSection />

      <footer className="text-center py-8 text-sm text-gray-400">
        <p className="font-bold">
          Heofon Global Search — Privacy First, Always.
        </p>

        <p className="mt-2">
          Norwegian-American search engine. No tracking. No selling data.
        </p>
      </footer>

    </main>
  );
}
