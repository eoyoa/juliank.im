import type { TitleChange } from "../foreground/components/mutable-title/TitleChanger.ts";

export class CatController {
  static #singleton: CatController = new CatController();

  #typeCallback: (() => void) | undefined;

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

  type(
    titleChange: TitleChange,
    resolve: (value: TitleChange | PromiseLike<TitleChange>) => void,
  ) {
    this.#typeCallback?.();
    resolve(titleChange);
  }
}
