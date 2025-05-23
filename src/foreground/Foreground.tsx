import { GitHub, LinkedIn } from "@mui/icons-material";
import "./Foreground.css";
import { IconButton, Stack, Typography } from "@mui/material";

export function Foreground() {
  return (
    <Stack className={"foreground"} direction={"column"}>
      <Typography>juliank.im</Typography>
      <Stack direction={"row"}>
        <IconButton>
          <GitHub />
        </IconButton>
        <IconButton>
          <LinkedIn />
        </IconButton>
      </Stack>
    </Stack>
  );
}
