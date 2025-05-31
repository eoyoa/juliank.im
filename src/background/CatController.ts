import {
  type TitleChange,
  TitleChanger,
} from "../foreground/components/mutable-title/title-changer/TitleChanger.ts";

export class CatController {
  static #singleton: CatController = new CatController();

  #typeCallback: (() => void) | undefined;
  #isDoneTyping: boolean = false;

  private constructor() {}

  static getController() {
    return CatController.#singleton;
  }

  attachTypeCallback(callback: () => void) {
    this.#typeCallback = callback;
  }

  detachTypeCallback() {
    this.#typeCallback = undefined;
  }

  get isDoneTyping() {
    return this.#isDoneTyping;
  }

  type(
    titleChange: TitleChange,
    resolve: (value: TitleChange | PromiseLike<TitleChange>) => void,
  ) {
    console.debug("cat typing:", titleChange);
    if (
      titleChange.newTitle ===
      TitleChanger.titles[TitleChanger.titles.length - 1]
    ) {
      this.#isDoneTyping = true;
    }
    if (titleChange.changeType === "text") {
      this.#typeCallback?.();
    }
    resolve(titleChange);
  }
}
