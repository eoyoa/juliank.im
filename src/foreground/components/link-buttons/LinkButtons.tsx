import { GitHub, LinkedIn } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { LinkButton } from "./LinkButton.tsx";

export function LinkButtons() {
  return (
    <Stack direction={"row"}>
      <LinkButton Icon={GitHub} link={"https://github.com/eoyoa"} />
      <LinkButton
        Icon={LinkedIn}
        link={"https://www.linkedin.com/in/juliank-/"}
      />
    </Stack>
  );
}
