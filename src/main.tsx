import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainContent } from "./MainContent.tsx";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import "@fontsource/roboto-mono";

const theme = responsiveFontSizes(
  createTheme({
    colorSchemes: {
      dark: false,
    },
    typography: {
      fontFamily: ['"Roboto Mono"', "monospace"].join(","),
    },
  }),
  {
    factor: 3,
  },
);

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <MainContent />
      </ThemeProvider>
    </CssBaseline>
  </StrictMode>,
);
