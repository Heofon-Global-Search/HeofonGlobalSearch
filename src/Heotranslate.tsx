import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftRight, Loader2, Copy, Check, Volume2 } from "lucide-react";
import { toast } from "sonner";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "nl", name: "Dutch" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "no", name: "Norwegian" },
  { code: "sv", name: "Swedish" },
  { code: "da", name: "Danish" },
  { code: "fi", name: "Finnish" },
  { code: "pl", name: "Polish" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" }
];

export default function Heotranslate() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setLoading(true);

    try {
      // Temporary translation engine placeholder.
      // Replace this later with your own Heofon translation API.
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          sourceText
        )}&langpair=${sourceLang}|${targetLang}`
      );

      const data = await response.json();

      setTranslatedText(
        data.responseData?.translatedText ||
          "Translation unavailable."
      );
    } catch {
      setTranslatedText("Translation failed. Please try again.");
    }

    setLoading(false);
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    toast.success("Copied to clipboard");

    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <main className="relative z-10 min-h-screen">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <img
              src="/HeofonGlobalSearchLogo2.png"
              alt="Heofon"
              className="w-8 h-8 rounded-full object-cover"
            />
          </Link>

          <h1 className="text-xl font-black">
            Heotranslate
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        <div className="flex items-center gap-3 mb-4">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="flex-1 bg-secondary border rounded-xl px-4 py-3"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSwap}
            className="p-3 rounded-full"
          >
            <ArrowLeftRight />
          </button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="flex-1 bg-secondary border rounded-xl px-4 py-3"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            className="h-52 p-4 rounded-2xl border resize-none"
          />

          <div className="h-52 p-4 rounded-2xl border overflow-auto">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              translatedText || "Translation will appear here..."
            )}
          </div>

        </div>

        <button
          onClick={handleTranslate}
          disabled={!sourceText.trim() || loading}
          className="w-full mt-4 py-4 rounded-2xl bg-primary font-black"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {translatedText && (
          <div className="mt-4 flex gap-3">
            <button onClick={() => handleSpeak(translatedText, targetLang)}>
              <Volume2 />
            </button>

            <button onClick={handleCopy}>
              {copied ? <Check /> : <Copy />}
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
