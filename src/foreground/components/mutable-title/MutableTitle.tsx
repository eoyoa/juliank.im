import { useEffect, useRef, useState } from "react";
import { EditableTypography } from "./EditableTypography.tsx";
import { TitleChanger } from "./title-changer/TitleChanger.ts";
import { AbortError } from "./title-changer/titleHelpers.ts";

function showCaretAtIndex(inputElement: HTMLInputElement, caretIndex: number) {
  inputElement.focus({ preventScroll: true });
  inputElement.setSelectionRange(caretIndex, caretIndex);
}

export function MutableTitle() {
  const [titleChanger] = useState<TitleChanger>(() => new TitleChanger());
  const [text, setText] = useState<string>(TitleChanger.titles[0]);

  const [lastChange, setLastChange] = useState<"caret" | "text">("text");

  // TODO: this state variables can probably be abstracted away when cat
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleUserInteraction = () => {
    setIsAnimating(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const abortController = new AbortController();

    // TODO: if not animating, go back to animating eventually
    // let resumeTimer: number | undefined;
    if (!isAnimating) {
      // resumeTimer = setTimeout(() => {
      //   titleChanger.clearEdits();
      //   setIsAnimating(true);
      // }, TitleChanger.resumeDelay);

      return;
    }

    const changeTitle = async () => {
      console.debug("changing title, current:", text, lastChange);
      const { newTitle, caretIndex, changeType } = await titleChanger.next(
        text,
        abortController.signal,
      );
      setText(newTitle);
      setLastChange(changeType);

      // hack to update dom immediately
      // avoids caret flickering
      if (inputRef.current) {
        inputRef.current.value = newTitle;
        showCaretAtIndex(inputRef.current, caretIndex);
      }
    };

    changeTitle().catch((err: unknown) => {
      if (err instanceof AbortError) {
        console.warn(err);
        return;
      }
      console.error(err);
    });

    return () => {
      abortController.abort();
      // clearTimeout(resumeTimer);
    };
  }, [isAnimating, text, titleChanger, lastChange]);

  return (
    <EditableTypography
      text={text}
      setText={setText}
      inputRef={inputRef}
      onUserInteraction={handleUserInteraction}
    />
  );
}
