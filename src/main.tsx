import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainContent } from "./MainContent.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/roboto-mono";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  typography: {
    fontFamily: `"Roboto Mono", monospace`,
  },
});

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <MainContent />
    </ThemeProvider>
  </StrictMode>,
);
