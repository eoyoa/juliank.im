import { GitHub, LinkedIn } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

export function LinkButtons() {
  return (
    <Stack direction={"row"}>
      <IconButton onClick={() => window.open("https://github.com/eoyoa")}>
        <GitHub />
      </IconButton>
      <IconButton
        onClick={() => window.open("https://www.linkedin.com/in/juliank-/")}
      >
        <LinkedIn />
      </IconButton>
    </Stack>
  );
}
