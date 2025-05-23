import { GitHub, LinkedIn } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

export function LinkButtons() {
  return (
    <Stack direction={"row"}>
      <IconButton>
        <GitHub />
      </IconButton>
      <IconButton>
        <LinkedIn />
      </IconButton>
    </Stack>
  );
}
