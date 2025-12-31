import Paste from "../model/paste.js";
import { getNow } from "../utils/time.js";

export async function createNewPaste(data) {
  const now = Date.now();

  const paste = new Paste({
    content: data.content,
    created_at: now,
    expires_at: data.ttl_seconds
      ? new Date(now + data.ttl_seconds * 1000)
      : null,
    max_views: data.max_views ?? null,
  });

  await paste.save();

  return {
    id: paste._id.toString(),
    url: `${process.env.FRONTEND_BASE_URL}/p/${paste._id}`,
  };
}

export async function fetchPaste(id, req) {
  const paste = await Paste.findById(id);
  if (!paste) throw notFound();

  const now = getNow(req);

  
  if (paste.expires_at && now >= paste.expires_at.getTime()) {
    await Paste.findByIdAndDelete(id);
    throw notFound();
  }

 
  if (paste.max_views !== null && paste.views >= paste.max_views) {
    await Paste.findByIdAndDelete(id);
    throw notFound();
  }

  paste.views += 1;
  await paste.save();

  return {
    content: paste.content,
    remaining_views:
      paste.max_views === null ? null : Math.max(paste.max_views - paste.views, 0),
    expires_at: paste.expires_at ? paste.expires_at.toISOString() : null,
  };
}

function notFound() {
  const err = new Error("Paste not found");
  err.status = 404;
  return err;
}
