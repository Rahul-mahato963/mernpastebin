import express from "express";
import { createNewPaste, fetchPaste } from "../services/services.js";

const router = express.Router();

// Create new paste (API)
router.post("/pastes", async (req, res) => {
  try {
    const { content, ttl_seconds, max_views } = req.body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ error: "Content is required" });
    }

    if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
      return res.status(400).json({ error: "ttl_seconds must be ≥ 1" });
    }

    if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1)) {
      return res.status(400).json({ error: "max_views must be ≥ 1" });
    }

    const paste = await createNewPaste({ content, ttl_seconds, max_views });
    res.status(201).json(paste);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/api/healthz", (req, res) => {
  // Optional: check DB connectivity here
  res.status(200).json({ ok: true });
});


// Fetch paste (JSON API)
router.get("/pastes/:id", async (req, res) => {
  try {
    const paste = await fetchPaste(req.params.id, req);
    res.json(paste);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// Fetch paste (HTML view)
router.get("/p/:id", async (req, res) => {
  try {
    const paste = await fetchPaste(req.params.id, req);
    res.send(`
      <html>
        <head>
          <title>Paste ${req.params.id}</title>
        </head>
        <body>
          <pre>${escapeHtml(paste.content)}</pre>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(404).send("<h1>Paste not found or expired</h1>");
  }
});


// Escape HTML to prevent XSS
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default router;
