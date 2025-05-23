import { Typography } from "@mui/material";
import "./MutableTitle.css";

export function MutableTitle() {
  return (
    <Typography
      className={"mutable-title"}
      variant={"h1"}
      contentEditable={"plaintext-only"}
      suppressContentEditableWarning={true}
      spellCheck={false}
    >
      juliank.im
    </Typography>
  );
}
