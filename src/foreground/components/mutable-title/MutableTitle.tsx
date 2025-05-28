import { useEffect, useMemo, useRef, useState } from "react";
import { EditableTypography } from "./EditableTypography.tsx";

function showCaretAtIndex(inputElement: HTMLInputElement, caretIndex: number) {
  inputElement.focus({ preventScroll: true });
  inputElement.setSelectionRange(caretIndex, caretIndex);
}

function getIndexToChange(curr: string, target: string) {
  let i = 0;

  for (; i < curr.length && i < target.length; i++) {
    if (curr[i] !== target[i]) {
      return i;
    }
  }
  return i;
}

export function MutableTitle() {
  const titles = useMemo(() => ["juliank.im", "i'm juliank."], []);
  const longestTitleLength = useMemo(
    () => titles.reduce((a, b) => (a.length > b.length ? a : b)).length,
    [titles],
  );

  const [i, setI] = useState<number>(0);
  const [text, setText] = useState<string>(titles[i]);

  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const handleUserInput = () => {
    setIsAnimating(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // is animating
  useEffect(() => {
    // TODO: change timer to go back to animating eventually
    if (!isAnimating) return;
    const timer = setTimeout(() => {
      if (i >= titles.length) return;

      const targetTitle = titles[i];

      if (text === targetTitle) {
        const newI = i + 1;
        console.log("~ changing i", newI);
        setI(newI);
      }

      console.log("~ changing text");

      const indexToChange = getIndexToChange(targetTitle, text) + 1;
      const newTitle =
        targetTitle.slice(0, indexToChange) + text.slice(indexToChange);
      console.log("new title", newTitle);
      setText(newTitle);

      if (inputRef.current) {
        inputRef.current.value = newTitle;
        showCaretAtIndex(inputRef.current, indexToChange);
      }
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [i, isAnimating, text, titles]);

  return (
    <EditableTypography
      text={text}
      setText={setText}
      inputRef={inputRef}
      onUserInput={handleUserInput}
      fontSize={`calc(100vw / ${(longestTitleLength + 2).toString()})`}
    />
  );
}
