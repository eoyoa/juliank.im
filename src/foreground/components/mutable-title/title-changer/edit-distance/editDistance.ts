import { getDiff } from "./editDistanceHelpers.ts";
import type { TitleChange } from "../TitleChanger.ts";

// convert to a series of moves, then generate and consume in TitleChanger
export function getEdits(initial: string, target: string) {
  const table = getDiff(initial, target);
  const edits: TitleChange[] = [];

  let i = initial.length;
  let j = target.length;
  let flag = false;

  let curr = initial;
  let totalEdits = 0;
  while (j >= 0) {
    if (flag) {
      break;
    }
    while (i >= 0) {
      const diff = table[i][j];
      let caretIndex = i;
      let del = false;
      const prevCurr = curr;

      if (diff.type === "nop") {
        i--;
        j--;
        continue;
      }

      switch (diff.type) {
        case "sub": {
          curr = curr.slice(0, i - 1) + target[j - 1] + curr.slice(i);
          // TODO: if this is an actual substitution, we should do a deletion then an insertion
          // TODO: or maybe a selection?
          caretIndex = i - 1;
          i--;
          j--;
          break;
        }
        case "ins":
          curr = curr.slice(0, i) + target[j - 1] + curr.slice(i);
          caretIndex = i;
          j--;
          break;
        case "del":
          del = true;
          curr = curr.slice(0, i - 1) + curr.slice(i);
          caretIndex = i;
          i--;
          break;
      }

      if (totalEdits === table[initial.length][target.length].dist) {
        flag = true;
        break;
      }
      
      if (
        edits.length === 0 ||
        edits[edits.length - 1].caretIndex !== caretIndex
      ) {
        edits.push({
          newTitle: prevCurr,
          caretIndex,
          changeType: "caret",
        });
      }
      edits.push({
        newTitle: curr,
        caretIndex: del ? caretIndex - 1 : caretIndex + 1,
        changeType: "text",
      });
      totalEdits++;
    }
  }

  if (edits.length > 0) {
    const editsCopy = Object.assign([], edits);
    const correct = edits[edits.length - 1].newTitle === target;
    if (!correct) {
      console.error(correct, editsCopy);
    } else console.debug(correct, editsCopy);
  }

  return edits;
}
