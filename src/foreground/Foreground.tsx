import "./Foreground.css";
import { Stack } from "@mui/material";
import { MutableTitle } from "./components/MutableTitle.tsx";
import { LinkButtons } from "./components/LinkButtons.tsx";

export function Foreground() {
  return (
    <Stack className={"foreground"} direction={"column"}>
      <MutableTitle />
      <LinkButtons />
    </Stack>
  );
}
