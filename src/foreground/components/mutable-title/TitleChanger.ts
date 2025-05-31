import { CatController } from "../../../background/CatController.ts";

function getIndexToChange(curr: string, target: string) {
  let i = 0;

  for (; i < curr.length && i < target.length; i++) {
    if (curr[i] !== target[i]) {
      return i;
    }
  }
  return i;
}

export interface TitleChange {
  newTitle: string;
  caretIndex: number;
}

export class AbortError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AbortError";
  }
}

export class TitleChanger {
  static readonly titles: string[] = [
    "juliank.im",
    "im.juliank",
    "i'm julian k.",
    "i'm julian k!",
  ];
  #titleIndex = 0;

  #timer: number | undefined = undefined;
  static readonly delay = 500;

  #catController: CatController = CatController.getController();

  next(currTitle: string, abortSignal: AbortSignal): Promise<TitleChange> {
    return new Promise((resolve, reject) => {
      if (this.#titleIndex >= TitleChanger.titles.length) {
        console.warn("no more titles! final change:", {
          newTitle: currTitle,
          caretIndex: currTitle.length,
        });
        resolve({ newTitle: currTitle, caretIndex: currTitle.length });
      }

      const targetTitle = TitleChanger.titles[this.#titleIndex];

      if (currTitle === targetTitle) {
        this.#titleIndex++;
        console.log("cycling titles...");
        this.next(currTitle, abortSignal).then(resolve).catch(reject);
        return;
      }

      const caretIndex = getIndexToChange(currTitle, targetTitle) + 1;
      const newTitle =
        targetTitle.slice(0, caretIndex) + currTitle.slice(caretIndex);

      this.#timer = setTimeout(() => {
        this.#catController.type({ newTitle, caretIndex }, resolve);
      }, TitleChanger.delay);
      abortSignal.onabort = () => {
        const err = new AbortError(
          "TitleChanger.next abort signal triggered! clearing timer...",
        );

        clearTimeout(this.#timer);
        reject(err);
      };
    });
  }
}
