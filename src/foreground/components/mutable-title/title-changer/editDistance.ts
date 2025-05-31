interface EditDistanceMove {
  type: "ins" | "del" | "sub";
  index: number;
  letter?: string;
}

export function getEdits(a: string, b: string): EditDistanceMove[] {
  const dp = editDistanceMatrix(a, b);
  return backtrackEditDistance(dp, b);
}

interface DPEntry {
  dist: number;
  type: "ins" | "del" | "sub";
}

function editDistanceMatrix(a: string, b: string) {
  const dp: DPEntry[][] = Array.from(Array<DPEntry>(a.length + 1), () =>
    Array<DPEntry>(b.length + 1).fill({ dist: Infinity, type: "ins" }),
  );

  for (let i = 1; i <= a.length; i++) {
    dp[i][0] = { dist: i, type: "del" };
  }
  for (let j = 1; j <= b.length; j++) {
    dp[0][j] = { dist: j, type: "ins" };
  }

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;

      dp[i][j] = {
        dist: dp[i - 1][j].dist + 1,
        type: "del",
      };
      if (dp[i][j - 1].dist + 1 < dp[i][j].dist) {
        dp[i][j] = {
          dist: dp[i][j - 1].dist + 1,
          type: "ins",
        };
      }
      if (dp[i - 1][j - 1].dist + substitutionCost < dp[i][j].dist) {
        dp[i][j] = {
          dist: dp[i - 1][j - 1].dist + substitutionCost,
          type: "sub",
        };
      }
    }
  }

  return dp;
}

function backtrackEditDistance(
  dp: DPEntry[][],
  target: string,
): EditDistanceMove[] {
  let i = dp.length - 1;
  let j = dp[0].length - 1;
  const moves: EditDistanceMove[] = [];
  while (i !== 0 || j !== 0) {
    const entry = dp[i][j];
    const index = i > j ? i : j;
    switch (entry.type) {
      case "ins":
        moves.push({ type: "ins", index, letter: target[index] });
        j--;
        break;
      case "del":
        moves.push({ type: "del", index });
        i--;
        break;
      case "sub":
        moves.push({ type: "sub", index, letter: target[index] });
        i--;
        j--;
        break;
    }
  }

  return moves;
}

export function mappedEdits(curr: string, target: string): EditDistanceMove[] {
  const edits = getEdits(curr, target);

  return edits.map((edit) => {
    switch (edit.type) {
      case "ins":
        return {
          type: "ins",
          index: edit.index,
          letter: target[edit.index - 1],
        };
      case "del":
        return { type: "del", index: edit.index };
      case "sub":
        return {
          type: "sub",
          index: edit.index,
          letter: target[edit.index - 1],
        };
    }
  });
}

// TODO: convert to series of moves, then just generate + consume in TitleChanger
export function printEdits(
  edits: EditDistanceMove[],
  initial: string,
  target: string,
) {
  let curr = initial;
  let edit: EditDistanceMove | undefined;
  let i = curr.length;
  while ((edit = edits.shift())) {
    switch (edit.type) {
      case "ins":
        i++;
        curr = curr.slice(0, i - 1) + (edit.letter ?? "") + curr.slice(i - 1);
        break;
      case "del":
        curr = curr.slice(0, i - 1) + curr.slice(i);
        break;
      case "sub":
        curr = curr.slice(0, i - 1) + (edit.letter ?? "") + curr.slice(i);
        break;
    }
    i--;
  }
  console.log(curr === target);
}
