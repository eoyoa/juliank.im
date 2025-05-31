import type { TitleChange } from "../foreground/components/mutable-title/TitleChanger.ts";

export class CatController {
  static #singleton: CatController = new CatController();

  private constructor() {}

  static getCat() {
    return CatController.#singleton;
  }

  type(
    titleChange: TitleChange,
    resolve: (value: TitleChange | PromiseLike<TitleChange>) => void,
  ) {
    console.log("cat typing:", titleChange);
    resolve(titleChange);
  }
}
