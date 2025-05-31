import { type Difference, getDiff } from "./editDistanceHelpers.ts";
import type { TitleChange } from "../TitleChanger.ts";

// convert to a series of moves, then generate and consume in TitleChanger
export function getEdits(initial: string, target: string) {
  const diffs = getDiff(initial, target);
  const edits: TitleChange[] = [];

  let curr = initial;
  let diff: Difference | undefined;
  let i = curr.length;
  while ((diff = diffs.shift())) {
    let push = true;
    let caretIndex = i;
    const prevCurr = curr;
    let del = false;

    switch (diff.type) {
      case "ins":
        i++;
        if (!diff.letter) {
          throw new Error("diff.letter is undefined for insertion move");
        }
        curr = curr.slice(0, i - 1) + diff.letter + curr.slice(i - 1);
        caretIndex = i - 1;
        break;
      case "del":
        del = true;
        curr = curr.slice(0, i - 1) + curr.slice(i);
        break;
      case "sub": {
        if (!diff.letter) {
          throw new Error("diff.letter is undefined for substitution move");
        }
        curr = curr.slice(0, i - 1) + diff.letter + curr.slice(i);
        push = curr !== prevCurr;
        break;
      }
    }

    if (push) {
      edits.push({
        newTitle: prevCurr,
        caretIndex,
        changeType: "caret",
      });
      edits.push({
        newTitle: curr,
        caretIndex: del ? caretIndex - 1 : i,
        changeType: "text",
      });
    }

    i--;
  }

  if (edits.length > 0) {
    const editsCopy = Object.assign([], edits);
    const correct = edits[edits.length - 1].newTitle === target;
    if (!correct) {
      console.error(correct, editsCopy);
    } else console.log(correct, editsCopy);
  }

  return edits;
}
