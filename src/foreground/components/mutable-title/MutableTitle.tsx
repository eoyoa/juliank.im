import { useEffect, useRef, useState } from "react";
import { EditableTypography } from "./EditableTypography.tsx";

function simulateTextChange(inputElement: HTMLInputElement, text: string) {
  inputElement.focus({ preventScroll: true });
  inputElement.setSelectionRange(text.length - 1, text.length - 1);
}

export function MutableTitle() {
  const [text, setText] = useState<string>("juliank.im");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    simulateTextChange(inputRef.current, text);
  }, [text]);

  return (
    <EditableTypography text={text} setText={setText} inputRef={inputRef} />
  );
}
