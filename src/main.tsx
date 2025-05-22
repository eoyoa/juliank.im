import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainContent } from "./MainContent.tsx";

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <MainContent />
  </StrictMode>,
);
