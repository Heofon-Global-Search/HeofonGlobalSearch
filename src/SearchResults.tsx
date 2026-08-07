import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  ExternalLink,
  Loader2,
  ImageIcon,
  FileText,
  Users,
  Info,
} from "lucide-react";

import SearchInput from "./SearchInput";

type Result = {
  title: string;
  url: string;
  snippet?: string;
};

type ImageResult = {
  title: string;
  url: string;
  imageUrl: string;
};

type Instant = {
  title?: string;
  abstract?: string;
  image?: string;
  source?: string;
  url?: string;
};

type Tab = "all" | "images";


function InstantAnswer({ data }: { data?: Instant }) {
  if (!data?.abstract) return null;

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4 text-primary" />
        <span className="text-xs font-black text-primary uppercase">
          Information
        </span>
      </div>

      <h2 className="font-black text-lg">
        {data.title}
      </h2>

      <p className="text-sm text-muted-foreground mt-2">
        {data.abstract}
      </p>

      {data.url && (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-primary text-sm font-bold"
        >
          Read more
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}


function ResultCard({ result }: { result: Result }) {
  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary transition"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-muted-foreground">
          {result.url}
        </span>

        <ExternalLink className="w-3 h-3 ml-auto" />
      </div>

      <h3 className="font-bold text-lg">
        {result.title}
      </h3>

      {result.snippet && (
        <p className="text-sm text-muted-foreground mt-2">
          {result.snippet}
        </p>
      )}
    </a>
  );
}


function RelatedSearches({
  items,
  onSearch,
}: {
  items: string[];
  onSearch: (q: string) => void;
}) {
  if (!items.length) return null;

  return (
    <div className="rounded-2xl border p-4">
      <div className="flex gap-2 items-center mb-3">
        <Users className="w-4 h-4" />
        <b>Related Searches</b>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSearch(item)}
            className="px-3 py-1 rounded-full border text-sm"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}


function ImageGrid({ images }: { images: ImageResult[] }) {
  if (!images.length) {
    return (
      <p className="text-center text-muted-foreground py-10">
        No images found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((img, i) => (
        <a
          key={i}
          href={img.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={img.imageUrl}
            alt={img.title}
            className="rounded-xl aspect-square object-cover"
          />
        </a>
      ))}
    </div>
  );
}


export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [tab, setTab] = useState<Tab>("all");

  const [results, setResults] = useState<Result[]>([]);
  const [images, setImages] = useState<ImageResult[]>([]);
  const [relatedSearches, setRelatedSearches] = useState<string[]>([]);
  const [instant, setInstant] = useState<Instant>();

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);


  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setSearched(true);


    // Temporary Heofon search engine placeholder
    setTimeout(() => {

      setResults([
        {
          title: "Heofon Global Search",
          url: "https://heofonsearch.com",
          snippet:
            `Search results for "${query}".`
        }
      ]);

      setImages([]);

      setRelatedSearches([
        `${query} news`,
        `${query} information`
      ]);

      setInstant({
        title: "Heofon",
        abstract:
          `Showing results for "${query}".`,
        source: "Heofon"
      });


      setLoading(false);

    }, 500);


  }, [query]);


  const handleSearch = (q: string) => {
    setSearchParams({
      q,
      tab
    });
  };


  return (
    <main className="relative z-10 min-h-screen">


      <header className="sticky top-0 bg-background/80 backdrop-blur border-b p-4">

        <div className="flex items-center gap-4">

          <Link to="/">
            <img
              src="/HeofonGlobalSearchLogo2.png"
              className="w-8 h-8 rounded-full"
              alt="Heofon"
            />
          </Link>


          <div className="flex-1">
            <SearchInput
              onSearch={handleSearch}
              initialQuery={query}
              compact
            />
          </div>

        </div>


        <div className="flex gap-3 mt-4">

          <button
            onClick={() => setTab("all")}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            All
          </button>


          <button
            onClick={() => setTab("images")}
            className="flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Images
          </button>

        </div>

      </header>



      <section className="container mx-auto px-4 py-8 max-w-4xl">


        {loading && (
          <Loader2 className="animate-spin mx-auto w-8 h-8" />
        )}



        {!loading && searched && tab === "all" && (

          <>
            <InstantAnswer data={instant} />


            <div className="space-y-4">

              {results.map((r, i) => (
                <ResultCard
                  key={i}
                  result={r}
                />
              ))}

            </div>


            <div className="mt-6">

              <RelatedSearches
                items={relatedSearches}
                onSearch={handleSearch}
              />

            </div>

          </>

        )}



        {!loading && tab === "images" && (
          <ImageGrid images={images} />
        )}



        {!searched && (
          <div className="text-center py-20">

            <Search className="mx-auto w-12 h-12 opacity-40" />

            <p className="mt-4">
              Search something to begin
            </p>

          </div>
        )}


      </section>


    </main>
  );
}
