import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CatController } from "./CatController.ts";
import { TitleChanger } from "../foreground/components/mutable-title/TitleChanger.ts";

export function Cat() {
  const [catController] = useState(() => CatController.getController());
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    let timer: number | undefined;

    const handleType = () => {
      console.log("cat typing:");
      setIsTyping(true);
      timer = setTimeout(() => {
        setIsTyping(false);
      }, TitleChanger.delay / 2);
    };

    catController.attachTypeCallback(handleType);

    return () => {
      catController.detachTypeCallback();
      clearTimeout(timer);
    };
  }, [catController]);

  return (
    <Typography variant={"h1"} align={"right"}>
      {isTyping ? "😼" : "😺"}
    </Typography>
  );
}
