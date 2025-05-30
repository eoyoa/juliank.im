function getIndexToChange(curr: string, target: string) {
  let i = 0;

  for (; i < curr.length && i < target.length; i++) {
    if (curr[i] !== target[i]) {
      return i;
    }
  }
  return i;
}

interface TitleChange {
  newTitle: string;
  caretIndex: number;
}

export class TitleChanger {
  readonly titles: string[] = ["juliank.im", "i'm juliank."];
  #titleIndex = 0;

  readonly #delay = 750;

  #timer: number | undefined = undefined;

  next(currTitle: string, abortSignal: AbortSignal): Promise<TitleChange> {
    return new Promise((resolve) => {
      if (this.#titleIndex >= this.titles.length)
        resolve({ newTitle: currTitle, caretIndex: currTitle.length });

      const targetTitle = this.titles[this.#titleIndex];

      if (currTitle === targetTitle) {
        this.#titleIndex++;
        void this.next(currTitle, abortSignal).then(resolve);
      }

      const caretIndex = getIndexToChange(currTitle, targetTitle) + 1;
      const newTitle =
        targetTitle.slice(0, caretIndex) + currTitle.slice(caretIndex);

      this.#timer = setTimeout(() => {
        resolve({ newTitle, caretIndex });
      }, this.#delay);
      abortSignal.onabort = () => {
        console.log("TitleChanger.next abort signal triggered!");

        clearTimeout(this.#timer);
      };
    });
  }
}
