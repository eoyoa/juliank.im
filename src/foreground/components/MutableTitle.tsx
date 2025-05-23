import { InputBase, type InputBaseProps, Typography } from "@mui/material";
import {
  type ChangeEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const InputBaseWithChildren = ({
  children,
  ...props
}: InputBaseProps & { children?: ReactNode }) => {
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
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (value: string) => {
    setText(value);
  };

  useEffect(() => {
    if (!inputRef.current) return;

    const inputElement = inputRef.current;

    inputElement.focus({ preventScroll: true });
    inputElement.setSelectionRange(text.length - 1, text.length - 1);
  }, [text.length]);

  return (
    <Typography
      variant={"h1"}
      component={InputBaseWithChildren}
      inputRef={inputRef}
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
