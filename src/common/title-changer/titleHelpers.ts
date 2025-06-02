export class AbortError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AbortError";
  }
}

export function getIndexToChange(curr: string, target: string) {
  let i = 0;

  for (; i < curr.length && i < target.length; i++) {
    if (curr[i] !== target[i]) {
      return i;
    }
  }
  return i;
}
