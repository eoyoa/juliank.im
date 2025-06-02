import { useCallback, useEffect, useRef, useState } from "react";
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

  const currentAbortController = useRef<AbortController | null>(null);
  const handleUserInteraction = useCallback(() => {
    currentAbortController.current?.abort();
    setIsAnimating(false);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const abortController = new AbortController();
    currentAbortController.current = abortController;

    let resumeTimer: number | undefined;
    if (!isAnimating) {
      resumeTimer = setTimeout(() => {
        titleChanger.clearEdits();
        setIsAnimating(true);
      }, TitleChanger.resumeDelay);

      return () => {
        clearTimeout(resumeTimer);
        currentAbortController.current = null;
      };
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
      currentAbortController.current = null;
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
