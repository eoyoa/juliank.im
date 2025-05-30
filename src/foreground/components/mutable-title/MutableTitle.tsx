import { useEffect, useRef, useState } from "react";
import { EditableTypography } from "./EditableTypography.tsx";
import { TitleChanger } from "./TitleChanger.ts";

function showCaretAtIndex(inputElement: HTMLInputElement, caretIndex: number) {
  inputElement.focus({ preventScroll: true });
  inputElement.setSelectionRange(caretIndex, caretIndex);
}

export function MutableTitle() {
  const [titleChanger] = useState<TitleChanger>(() => new TitleChanger());
  const [text, setText] = useState<string>(titleChanger.titles[0]);

  // TODO: this state variables can probably be abstracted away when cat
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleUserInteraction = () => {
    setIsAnimating(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // TODO: if not animating, go back to animating eventually
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      const { newTitle, caretIndex } = titleChanger.next(text);
      setText(newTitle);

      // hack to update dom immediately
      // avoids caret flickering
      if (inputRef.current) {
        inputRef.current.value = newTitle;
        showCaretAtIndex(inputRef.current, caretIndex);
      }
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [isAnimating, text, titleChanger]);

  return (
    <EditableTypography
      text={text}
      setText={setText}
      inputRef={inputRef}
      onUserInteraction={handleUserInteraction}
    />
  );
}
