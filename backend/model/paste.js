import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  expires_at: { type: Date, default: null },
  max_views: { type: Number, default: null },
  views: { type: Number, default: 0 },
});

export default mongoose.model("Paste", pasteSchema);
