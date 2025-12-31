import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../component/ErrorMessage";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPaste() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${BASE_URL}/api/pastes/${id}`);
        setPaste(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Paste not found or expired");
      } finally {
        setLoading(false);
      }
    }

    getPaste();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading paste...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-green-500">Paste</h2>
      <pre className="bg-gray-100 p-3 rounded border border-gray-300 whitespace-pre-wrap break-words">
        {paste?.content || "No content available"}
      </pre>

      {paste?.remaining_views != null && (
        <p className="mt-2 text-sm text-gray-700">
          Remaining views: {paste.remaining_views}
        </p>
      )}

      {paste?.expires_at && (
        <p className="text-sm text-gray-700">
          Expires at: {new Date(paste.expires_at).toLocaleString()}
        </p>
      )}
    </div>
  );
}
