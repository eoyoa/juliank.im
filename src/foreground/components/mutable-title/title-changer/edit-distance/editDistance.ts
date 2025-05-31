import { type Difference, getDiff } from "./editDistanceHelpers.ts";

export interface Edit {
  newTitle: string;
  caretIndex: number;
}

// convert to a series of moves, then generate and consume in TitleChanger
export function getEdits(initial: string, target: string) {
  const diffs = getDiff(initial, target);
  const edits: Edit[] = [];

  let curr = initial;
  let diff: Difference | undefined;
  let i = curr.length;
  while ((diff = diffs.shift())) {
    let push = true;
    let caretIndex = i;
    switch (diff.type) {
      case "ins":
        i++;
        if (!diff.letter) {
          throw new Error("diff.letter is undefined for insertion move");
        }
        curr = curr.slice(0, i - 1) + diff.letter + curr.slice(i - 1);
        caretIndex = i;
        break;
      case "del":
        curr = curr.slice(0, i - 1) + curr.slice(i);
        caretIndex = i - 1;
        break;
      case "sub": {
        if (!diff.letter) {
          throw new Error("diff.letter is undefined for insertion move");
        }
        const prevCurr = curr;
        curr = curr.slice(0, i - 1) + diff.letter + curr.slice(i);
        push = curr !== prevCurr;
        break;
      }
    }
    if (push) {
      edits.push({ newTitle: curr, caretIndex });
    }
    i--;
  }

  const editsCopy = Object.assign([], edits);
  const correct = edits[edits.length - 1].newTitle === target;
  if (!correct) {
    console.error(correct, editsCopy);
  } else console.log(correct, editsCopy);

  return edits;
}
