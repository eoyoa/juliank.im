import { useCallback, useEffect, useRef, useState } from "react";
import { EditableTypography } from "./EditableTypography.tsx";
import { TitleChanger } from "../../../common/title-changer/TitleChanger.ts";
import { AbortError } from "../../../common/title-changer/titleHelpers.ts";
import { CatController } from "../../../common/CatController.ts";

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
  const [catController] = useState(() => CatController.getController());

  const currentAbortController = useRef<AbortController | null>(null);
  const handleUserInteraction = useCallback(() => {
    currentAbortController.current?.abort();
    setIsAnimating(false);
    catController.isTyping = false;
  }, [catController]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const abortController = new AbortController();
    currentAbortController.current = abortController;

    let resumeTimer: number | undefined;
    if (!isAnimating) {
      resumeTimer = setTimeout(() => {
        titleChanger.restart();
        setIsAnimating(true);
        catController.isTyping = true;
      }, TitleChanger.resumeDelay);

      return () => {
        clearTimeout(resumeTimer);
        currentAbortController.current = null;
      };
    }

    const changeTitle = async () => {
      while (!abortController.signal.aborted && !catController.isDoneTyping) {
        // console.debug(
        //   "changing title, current:",
        //   text,
        //   lastChange,
        //   catController.isDoneTyping,
        // );
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
      }
    };

    changeTitle().catch((err: unknown) => {
      if (err instanceof AbortError) {
        console.warn(err);
      } else {
        console.error(err);
      }
    });

    return () => {
      abortController.abort();
      currentAbortController.current = null;
    };
  }, [isAnimating, text, titleChanger, catController, lastChange]);

  return (
    <EditableTypography
      text={text}
      setText={setText}
      inputRef={inputRef}
      onUserInteraction={handleUserInteraction}
    />
  );
}
