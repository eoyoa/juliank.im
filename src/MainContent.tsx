import { Foreground } from "./foreground/Foreground.tsx";
import { Background } from "./background/Background.tsx";
import { Box, Stack } from "@mui/material";
import { Resume } from "./resume/Resume.tsx";

export function MainContent() {
  return (
    <Stack>
      <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>
        <Foreground />
        <Background />
      </Box>
      <Resume />
    </Stack>
  );
}
