import { CatController } from "../../../../background/CatController.ts";
import { AbortError } from "./titleHelpers.ts";
import { type Edit, getEdits } from "./edit-distance/editDistance.ts";

export interface TitleChange {
  newTitle: string;
  caretIndex: number;
}

export class TitleChanger {
  static readonly titles: string[] = [
    "juliank.im",
    "julian kim.",
    "im julian k.",
    "i'm julian k.",
    "i'm julian k!",
  ];
  #titleIndex = 0;

  #timer: number | undefined = undefined;
  static readonly #baseDelay = 500;
  static #nextTitleDelay: number | undefined;
  static #initialDelay: number | undefined = TitleChanger.#baseDelay / 2;

  #catController: CatController = CatController.getController();

  #edits: Edit[] = [];

  static getDelay() {
    return (
      (TitleChanger.#initialDelay ?? 0) +
      TitleChanger.#baseDelay +
      (TitleChanger.#nextTitleDelay ?? 0)
    );
  }

  generateEdits(initial: string, target: string) {
    this.#edits = getEdits(initial, target);
  }

  next(currTitle: string, abortSignal: AbortSignal): Promise<TitleChange> {
    return new Promise((resolve, reject) => {
      abortSignal.onabort = () => {
        const err = new AbortError(
          "TitleChanger.next abort signal triggered! clearing timer...",
        );

        clearTimeout(this.#timer);
        reject(err);
      };

      if (this.#titleIndex >= TitleChanger.titles.length) {
        console.warn("no more titles! final change:", {
          newTitle: currTitle,
          caretIndex: currTitle.length,
        });
        resolve({ newTitle: currTitle, caretIndex: currTitle.length });
        return;
      }

      const targetTitle = TitleChanger.titles[this.#titleIndex];

      if (currTitle === targetTitle) {
        console.log("cycling titles...");
        this.#titleIndex++;
        TitleChanger.#nextTitleDelay = TitleChanger.#baseDelay;
        this.next(currTitle, abortSignal).then(resolve).catch(reject);
        return;
      }
      if (this.#edits.length === 0) {
        console.log("generating edits...");
        this.generateEdits(currTitle, targetTitle);
        this.next(currTitle, abortSignal).then(resolve).catch(reject);
        return;
      }

      this.#timer = setTimeout(() => {
        const edit = this.#edits.shift();
        if (!edit) {
          const err = new Error("edit is undefined!");
          reject(err);
          return;
        }
        const { newTitle, caretIndex } = edit;

        this.#catController.type({ newTitle, caretIndex }, resolve);
        if (TitleChanger.#initialDelay) {
          TitleChanger.#initialDelay = undefined;
        }
        if (TitleChanger.#nextTitleDelay) {
          TitleChanger.#nextTitleDelay = undefined;
        }
      }, TitleChanger.getDelay());
    });
  }
}
