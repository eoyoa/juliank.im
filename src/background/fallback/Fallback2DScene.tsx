import { Stack, Typography } from "@mui/material";
import { Cat } from "./Cat.tsx";

export function Fallback2DScene() {
  return (
    <Stack height={"100%"} direction={"column"} justifyContent={"flex-end"}>
      <Typography align={"right"}>background work in progress...</Typography>
      <Cat />
    </Stack>
  );
}
