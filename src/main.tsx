import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainContent } from "./MainContent.tsx";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import "@fontsource/roboto-mono";

const theme = responsiveFontSizes(
  createTheme({
    colorSchemes: {
      dark: true,
    },
    typography: {
      fontFamily: ['"Roboto Mono"', "monospace"].join(","),
    },
  }),
  {
    factor: 2.5,
  },
);

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <MainContent />
    </ThemeProvider>
  </StrictMode>,
);
