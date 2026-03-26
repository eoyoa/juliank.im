import {
  type TitleChange,
  TitleChanger,
} from "./title-changer/TitleChanger.ts";

export class CatController {
  static #singleton: CatController = new CatController();

  #typeCallback: (() => void) | undefined;
  #isDoneTyping: boolean = false;
  #isTyping: boolean = true;

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

  resetDoneTyping() {
    this.#isDoneTyping = false;
  }

  get isTyping() {
    return this.#isTyping;
  }

  set isTyping(value: boolean) {
    this.#isTyping = value;
    this.#typeCallback?.();
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
      console.warn("done typing");
      this.#isDoneTyping = true;
    }
    if (titleChange.changeType === "text") {
      this.#typeCallback?.();
    }
    resolve(titleChange);
  }
}
