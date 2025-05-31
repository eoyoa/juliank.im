import type { TitleChange } from "../foreground/components/mutable-title/TitleChanger.ts";

export class Cat {
  static #singleton: Cat = new Cat();

  private constructor() {}

  static getCat() {
    return Cat.#singleton;
  }

  type(
    titleChange: TitleChange,
    resolve: (value: TitleChange | PromiseLike<TitleChange>) => void,
  ) {
    console.log("cat typing:", titleChange);
    resolve(titleChange);
  }
}
