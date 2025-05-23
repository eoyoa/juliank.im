import { Typography } from "@mui/material";

export function MutableTitle() {
  return (
    <Typography
      variant={"h1"}
      contentEditable={"plaintext-only"}
      suppressContentEditableWarning={true}
      spellCheck={false}
      sx={{
        outlineWidth: 0,
        outlineStyle: "solid",
        outlineColor: "transparent",
      }}
    >
      juliank.im
    </Typography>
  );
}
