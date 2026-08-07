import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, ExternalLink, Clock } from "lucide-react";

type Article = {
  title: string;
  description: string;
  thumbnail?: string;
  link: string;
  pubDate?: string;
};

const CATEGORIES = [
  { id: "top", label: "Top Stories" },
  { id: "world", label: "World" },
  { id: "business", label: "Business" },
  { id: "technology", label: "Technology" },
  { id: "science", label: "Science" },
  { id: "health", label: "Health" },
  { id: "entertainment", label: "Entertainment" },
];

function timeAgo(date?: string) {
  if (!date) return "";

  const diff = Date.now() - new Date(date).getTime();

  const mins = Math.floor(diff / 60000);

  if (mins < 60) return `${mins}m ago`;

  const hours = Math.floor(mins / 60);

  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
}


function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition"
    >
      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt=""
          className="w-28 h-20 rounded-lg object-cover"
        />
      )}

      <div>
        <h2 className="font-black text-lg">
          {article.title}
        </h2>

        <p className="text-muted-foreground text-sm mt-1">
          {article.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <Clock className="w-3 h-3" />
          {timeAgo(article.pubDate)}

          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
}


export default function Heonews() {

  const [category, setCategory] = useState("top");

  const [loading] = useState(false);


  const articles: Article[] = [
    {
      title: "Welcome to Heonews",
      description:
        "Heonews is the news platform inside Heofon Global Search.",
      link: "#",
    },
    {
      title: "Technology Updates",
      description:
        "Latest technology, AI, and internet news will appear here.",
      link: "#",
    },
    {
      title: "Privacy Focused News",
      description:
        "Heofon believes in a safer and more private web.",
      link: "#",
    },
  ];


  return (
    <main className="min-h-screen relative z-10">

      <header className="sticky top-0 border-b border-border/40 backdrop-blur-xl p-4">

        <div className="container mx-auto flex items-center gap-3">

          <Link to="/">
            <img
              src="/HeofonGlobalSearchLogo2.png"
              alt="Heofon"
              className="w-9 h-9 rounded-full"
            />
          </Link>

          <h1 className="text-2xl font-black">
            Heonews
          </h1>

        </div>


        <div className="container mx-auto flex gap-2 mt-4 overflow-x-auto">

          {CATEGORIES.map((cat) => (

            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={
                category === cat.id
                  ? "px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold"
                  : "px-4 py-2 rounded-full bg-secondary font-bold"
              }
            >
              {cat.label}
            </button>

          ))}

        </div>

      </header>


      <section className="container mx-auto max-w-4xl px-4 py-8">

        {loading ? (

          <Loader2 className="animate-spin w-8 h-8 mx-auto" />

        ) : (

          <div className="space-y-4">

            {articles.map((article, index) => (

              <ArticleCard
                key={index}
                article={article}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}
