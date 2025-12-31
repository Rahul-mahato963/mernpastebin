const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function createPaste(data) {
  const res = await fetch(`${API_BASE}/api/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to create paste");
  return json;
}

export async function fetchPaste(id) {
  const res = await fetch(`${API_BASE}/api/pastes/${id}`);
  const json = await res.json();
  if (!res.ok) throw new Error("Paste not found or expired");
  return json;
}
