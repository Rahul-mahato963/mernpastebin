import { Routes, Route } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste.jsx";
import ViewPaste from "./pages/ViewPaste.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreatePaste />} />
      <Route path="/paste/:id" element={<ViewPaste />} />
      <Route path="/p/:id" element={<ViewPaste />} />

    </Routes>
  );
}
