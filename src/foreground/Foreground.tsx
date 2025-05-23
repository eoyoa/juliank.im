import { Stack } from "@mui/material";
import { MutableTitle } from "./components/mutable-title/MutableTitle.tsx";
import { LinkButtons } from "./components/LinkButtons.tsx";
import { StackedBox } from "../common/StackedBox.tsx";

export function Foreground() {
  return (
    <StackedBox zIndex={1}>
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
    </StackedBox>
  );
}
