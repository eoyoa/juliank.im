import { InputBase, type InputBaseProps, Typography } from "@mui/material";
import { type ChangeEvent, useState } from "react";

const InputBaseWithChildren = ({
  children,
  ...props
}: InputBaseProps & { children?: React.ReactNode }) => {
  let value = "";
  if (children) {
    if (typeof children == "string" || typeof children == "number") {
      value = children.toString();
    }
  }

  return (
    <InputBase
      {...props}
      className={""}
      value={value}
      inputProps={{ className: props.className }}
    />
  );
};

export function MutableTitle() {
  const [text, setText] = useState<string>("juliank.im");

  const onChange = (value: string) => {
    setText(value);
  };

  return (
    <Typography
      variant={"h1"}
      component={InputBaseWithChildren}
      textAlign={"center"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      }}
      sx={{
        outlineWidth: 0,
        outlineStyle: "solid",
        outlineColor: "transparent",
      }}
    >
      {text}
    </Typography>
  );
}
