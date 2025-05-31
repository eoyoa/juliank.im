import { type Difference, getDiff } from "./editDistanceHelpers.ts";

interface Edit {
  type: "ins" | "del" | "sub";
  i: number;
  letter?: string;
}

// convert to a series of moves, then generate and consume in TitleChanger
export function getEdits(initial: string, target: string) {
  const diffs = getDiff(initial, target);
  const edits: Edit[] = [];

  let curr = initial;
  let diff: Difference | undefined;
  let i = curr.length;
  while ((diff = diffs.shift())) {
    switch (diff.type) {
      case "ins":
        i++;
        if (!diff.letter) {
          throw new Error("diff.letter is undefined for insertion move");
        }
        curr = curr.slice(0, i - 1) + diff.letter + curr.slice(i - 1);
        edits.push({ type: "ins", i, letter: diff.letter });
        break;
      case "del":
        curr = curr.slice(0, i - 1) + curr.slice(i);
        edits.push({ type: "del", i });
        break;
      case "sub": {
        if (!diff.letter) {
          throw new Error("diff.letter is undefined for insertion move");
        }
        const prevCurr = curr;
        curr = curr.slice(0, i - 1) + diff.letter + curr.slice(i);
        // skip useless sub
        if (curr !== prevCurr) {
          edits.push({ type: "sub", i, letter: diff.letter });
        }
        break;
      }
    }
    i--;
  }
  console.log(curr === target);
  console.log(edits);

  return edits;
}
