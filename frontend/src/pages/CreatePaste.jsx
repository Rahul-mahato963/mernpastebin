import { useState } from "react";
import axios from "axios";
import ErrorMessage from "../component/ErrorMessage";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [pasteId, setPasteId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setPasteId(null);

    if (!content.trim()) {
      setError("Content cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/api/pastes`, {
        content: content.trim(),
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: maxViews ? Number(maxViews) : undefined,
      });

      setPasteId(res.data.id); // store only ID
      setContent("");
      setTtl("");
      setMaxViews("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create paste");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Pastebin Lite</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your text..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="TTL (seconds)"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
            min="1"
          />

          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Max views"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)}
            min="1"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Creating..." : "Create Paste"}
          </button>
        </form>
        {pasteId && (
          <div className="mt-4 p-3 bg-green-100 rounded">
            <p className="text-sm font-semibold">Shareable URL:</p>
            <a
              href={`${window.location.origin}/p/${pasteId}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 break-all underline"
            >
              {`/p/${pasteId}`}
            </a>
          </div>
        )}

        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}
