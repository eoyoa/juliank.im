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
  #titleIndex: number = 0;

  next(currTitle: string): TitleChange {
    if (this.#titleIndex >= this.titles.length)
      return { newTitle: currTitle, caretIndex: currTitle.length };

    const targetTitle = this.titles[this.#titleIndex];

    if (currTitle === targetTitle) {
      this.#titleIndex++;
      return this.next(currTitle);
    }

    const caretIndex = getIndexToChange(currTitle, targetTitle) + 1;
    const newTitle =
      targetTitle.slice(0, caretIndex) + currTitle.slice(caretIndex);
    return { newTitle, caretIndex };
  }
}
