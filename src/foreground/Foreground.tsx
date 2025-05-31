import { Stack } from "@mui/material";
import { MutableTitle } from "./components/mutable-title/MutableTitle.tsx";
import { LinkButtons } from "./components/link-buttons/LinkButtons.tsx";
import { Layer } from "../common/Layer.tsx";

export function Foreground() {
  return (
    <Layer zIndex={1}>
      <Stack
        direction={"column"}
        width={"100%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <MutableTitle />
        <LinkButtons />
      </Stack>
    </Layer>
  );
}
