import { Snackbar, SnackbarContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CatController } from "./CatController.ts";
import { TitleChanger } from "../foreground/components/mutable-title/TitleChanger.ts";

export function Cat() {
  const [catController] = useState(() => CatController.getController());
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsTyping(false);
    setOpen(false);
  };

  useEffect(() => {
    let timer: number | undefined;

    const handleType = () => {
      setIsTyping(true);
      setOpen(true);
      console.log("animated cat");
    };

    catController.attachTypeCallback(handleType);

    return () => {
      catController.detachTypeCallback();
      clearTimeout(timer);
    };
  }, [catController]);

  return (
    <>
      <Typography variant={"h1"} align={"right"}>
        {catController.isDoneTyping ? "😸" : isTyping ? "😼" : "😺"}
      </Typography>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "&.MuiSnackbar-anchorOriginBottomRight": {
            bottom: "100px",
          },
          "& .MuiSnackbarContent-root": {
            minWidth: "fit-content",
            flexGrow: 0,
          },
        }}
        open={open}
        onClose={handleClose}
        autoHideDuration={TitleChanger.getDelay() / 3}
      >
        <SnackbarContent message={"type..."} />
      </Snackbar>
    </>
  );
}
