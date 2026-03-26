import { Snackbar, SnackbarContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CatController } from "../../common/CatController.ts";
import { TitleChanger } from "../../common/title-changer/TitleChanger.ts";

export function Cat() {
  const [catController] = useState(() => CatController.getController());
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsTyping(false);
    setOpen(false);
  };

  useEffect(() => {
    const handleType = () => {
      setIsTyping(true);
      setOpen(true);
      // console.debug("animated cat");
    };

    catController.attachTypeCallback(handleType);

    return () => {
      catController.detachTypeCallback();
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
