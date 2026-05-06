import { useState } from "react";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #111;
  color: #ddd;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.app { min-height: 100vh; background: #111; }

/* HEADER */
.header {
  background: #161616;
  border-bottom: 1px solid #222;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-size: 16px;
  font-weight: 700;
  color: #eee;
  letter-spacing: -0.4px;
}

.logo span { color: #f97316; }

.badge {
  margin-left: auto;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #555;
  text-transform: uppercase;
}

/* MAIN */
.main {
  max-width: 680px;
  margin: 0 auto;
  padding: 36px 20px 60px;
}

.tagline {
  font-size: 22px;
  font-weight: 700;
  color: #eee;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
}

.sub {
  color: #555;
  font-size: 13px;
  margin-bottom: 28px;
}

/* FORM */
.field { margin-bottom: 14px; }

label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: #555;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  background: #1a1a1a;
  border: 1px solid #272727;
  border-radius: 8px;
  padding: 10px 12px;
  color: #ddd;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
}

input:focus, textarea:focus { border-color: #444; }
input::placeholder, textarea::placeholder { color: #383838; }
textarea { resize: none; height: 72px; }

.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 500px) { .row { grid-template-columns: 1fr; } }

/* DIVIDER */
.divider {
  border: none;
  border-top: 1px solid #1e1e1e;
  margin: 20px 0;
}

/* PILLS */
.pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
}

.pill {
  padding: 6px 13px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #272727;
  background: transparent;
  color: #555;
  font-family: 'Inter', sans-serif;
  transition: all 0.12s;
  user-select: none;
}

.pill:hover { border-color: #f97316; color: #f97316; }

.pill.active {
  background: #f97316;
  border-color: #f97316;
  color: #000;
  font-weight: 600;
}

/* SECTION LABEL */
.section-label {
  font-size: 11px;
  font-weight: 600;
  color: #444;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

/* GENERATE BUTTON */
.gen-btn {
  width: 100%;
  padding: 13px;
  background: #f97316;
  color: #000;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  margin-top: 20px;
  letter-spacing: 0.2px;
}

.gen-btn:hover:not(:disabled) { background: #fb923c; transform: translateY(-1px); }
.gen-btn:active:not(:disabled) { transform: translateY(0); }
.gen-btn:disabled { background: #2a2a2a; color: #444; cursor: not-allowed; }

/* LOADING */
.loading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  color: #444;
  font-size: 13px;
}

.spinner {
  width: 16px; height: 16px;
  border: 2px solid #2a2a2a;
  border-top-color: #f97316;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
  flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* RESULTS */
.results { margin-top: 28px; }

.result-block {
  background: #161616;
  border: 1px solid #222;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
  animation: fadeUp 0.3s ease;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.result-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #555;
}

.copy-btn {
  background: transparent;
  border: 1px solid #2a2a2a;
  color: #555;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: all 0.12s;
}

.copy-btn:hover { border-color: #f97316; color: #f97316; }
.copy-btn.copied { border-color: #555; color: #888; }

.result-text {
  font-size: 13px;
  line-height: 1.65;
  color: #aaa;
  white-space: pre-wrap;
}

/* ERROR */
.error {
  margin-top: 16px;
  background: #1c1212;
  border: 1px solid #3a1f1f;
  border-radius: 8px;
  padding: 12px 14px;
  color: #e05555;
  font-size: 13px;
}
`;

const CONTENT_TYPES = [
  { id: "product_desc", label: "Product Description" },
  { id: "seo_meta", label: "SEO Meta" },
  { id: "bullet_points", label: "Feature Bullets" },
  { id: "email_copy", label: "Email Copy" },
  { id: "social_caption", label: "Social Caption" },
  { id: "ad_copy", label: "Ad Copy" },
];

const TONES = ["Professional", "Playful", "Luxury", "Bold", "Friendly", "Minimal"];

function parseResults(text) {
  const sections = [];
  const lines = text.split("\n");
  let current = null;
  for (const line of lines) {
    const header = line.match(/^#{1,3}\s+(.+)$/) || line.match(/^\*\*(.+)\*\*\s*$/);
    if (header) {
      if (current) sections.push(current);
      current = { label: header[1].replace(/\*\*/g, "").trim(), content: [] };
    } else if (current) {
      current.content.push(line);
    } else {
      current = { label: "Generated Content", content: [line] };
    }
  }
  if (current) sections.push(current);
  return sections
    .map((s) => ({ ...s, content: s.content.join("\n").trim() }))
    .filter((s) => s.content.length > 0);
}

export default function App() {
  const [productName, setProductName] = useState("");
  const [keyDetails, setKeyDetails] = useState("");
  const [price, setPrice] = useState("");
  const [tone, setTone] = useState("Professional");
  const [selectedTypes, setSelectedTypes] = useState(["product_desc", "bullet_points"]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState({});

  const toggleType = (id) =>
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2000);
  };

  const handleGenerate = async () => {
    if (!productName.trim() || selectedTypes.length === 0) return;
    setLoading(true);
    setError("");
    setResults(null);

    const typeLabels = selectedTypes
      .map((id) => CONTENT_TYPES.find((t) => t.id === id)?.label)
      .join(", ");

    const prompt = `You are an expert Shopify copywriter. Generate the following content for a Shopify product listing: ${typeLabels}.

Product: ${productName}
Details: ${keyDetails || "No additional details provided"}
Price: ${price ? "$" + price : "Not specified"}
Tone: ${tone}

Use a clear ## heading for each content type. Write conversion-focused copy ready to paste into Shopify. Be specific and compelling.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content?.map((b) => b.text || "").join("") || "";
      setResults(parseResults(text));
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isReady = productName.trim() && selectedTypes.length > 0 && !loading;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="header">
          <div className="logo">
            quiet<span>c</span>ai
          </div>
          <div className="badge">Shopify Copy Generator</div>
        </header>

        <main className="main">
          <div className="tagline">Generate copy that sells.</div>
          <div className="sub">
            Fill in your product details and get Shopify-ready content instantly.
          </div>

          <div className="row">
            <div className="field">
              <label>Product Name *</label>
              <input
                placeholder="e.g. Lavender Soy Candle"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Price (optional)</label>
              <input
                placeholder="e.g. 24.99"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Key Details</label>
            <textarea
              placeholder="Features, materials, benefits, target customer... anything relevant"
              value={keyDetails}
              onChange={(e) => setKeyDetails(e.target.value)}
            />
          </div>

          <hr className="divider" />

          <div className="section-label">Tone</div>
          <div className="pill-group">
            {TONES.map((t) => (
              <button
                key={t}
                className={`pill ${tone === t ? "active" : ""}`}
                onClick={() => setTone(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <hr className="divider" />

          <div className="section-label">What to generate</div>
          <div className="pill-group">
            {CONTENT_TYPES.map((type) => (
              <button
                key={type.id}
                className={`pill ${selectedTypes.includes(type.id) ? "active" : ""}`}
                onClick={() => toggleType(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>

          <button className="gen-btn" onClick={handleGenerate} disabled={!isReady}>
            {loading ? "Generating..." : "Generate Content →"}
          </button>

          {loading && (
            <div className="loading">
              <div className="spinner" />
              Writing your copy...
            </div>
          )}

          {error && <div className="error">{error}</div>}

          {results && (
            <div className="results">
              {results.map((section, i) => (
                <div className="result-block" key={i}>
                  <div className="result-header">
                    <div className="result-title">{section.label}</div>
                    <button
                      className={`copy-btn ${copied[i] ? "copied" : ""}`}
                      onClick={() => handleCopy(section.content, i)}
                    >
                      {copied[i] ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="result-text">{section.content}</div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
