import { InputBase, type InputBaseProps, Typography } from "@mui/material";
import type {
  ChangeEvent,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";

function InputBaseWithChildren({
  children,
  ...props
}: InputBaseProps & { children?: ReactNode }) {
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
}

interface EditableTypographyProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement | null>;
  onUserInteraction: () => void;
}

export function EditableTypography({
  text,
  setText,
  inputRef,
  onUserInteraction,
}: EditableTypographyProps) {
  const onChange = (value: string) => {
    setText(value);
  };

  return (
    <Typography
      variant={"h1"}
      component={InputBaseWithChildren}
      inputRef={inputRef}
      textAlign={"center"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        onUserInteraction();
      }}
      onClick={() => {
        onUserInteraction();
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
