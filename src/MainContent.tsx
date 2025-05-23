import { Foreground } from "./foreground/Foreground.tsx";
import { Background } from "./background/Background.tsx";
import { Box } from "@mui/material";

export function MainContent() {
  return (
    <Box sx={{ position: "relative", width: 1, height: 1 }}>
      <Foreground />
      <Background />
    </Box>
  );
}
