import { Box, styled } from "@mui/material";

export const Layer = styled(Box)({
  position: "absolute",
  width: "fit-content",
  height: "fit-content",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
