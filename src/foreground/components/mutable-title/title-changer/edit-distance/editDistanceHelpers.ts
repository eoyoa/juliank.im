type DiffType = "ins" | "del" | "sub";

export interface Difference {
  type: DiffType;
  targetIndex: number;
  letter?: string;
}

export function getDiff(a: string, b: string): Difference[] {
  const dp = editDistanceMatrix(a, b);

  // function print2DArray(arr: DPEntry[][]) {
  //   for (let i = 0; i < arr.length; i++) {
  //     console.log(arr[i].map((value) => value.dist).join("\t"));
  //   }
  // }
  //
  // print2DArray(dp);
  return backtrackEditDistance(dp, b);
}

interface DPEntry {
  dist: number;
  type: DiffType;
}

function editDistanceMatrix(a: string, b: string) {
  const dp: DPEntry[][] = Array.from(Array<DPEntry>(a.length + 1), () =>
    Array<DPEntry>(b.length + 1).fill({ dist: 0, type: "ins" }),
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

function backtrackEditDistance(dp: DPEntry[][], target: string): Difference[] {
  let i = dp.length - 1;
  let j = dp[0].length - 1;
  const diffs: Difference[] = [];
  while (i !== 0 || j !== 0) {
    const entry = dp[i][j];
    const targetIndex = i > j ? i : j;
    switch (entry.type) {
      case "ins":
        diffs.push({
          type: "ins",
          targetIndex,
          letter: target[targetIndex - 1],
        });
        j--;
        break;
      case "del":
        diffs.push({ type: "del", targetIndex });
        i--;
        break;
      case "sub":
        diffs.push({
          type: "sub",
          targetIndex,
          letter: target[targetIndex - 1],
        });
        i--;
        j--;
        break;
    }
  }

  return diffs;
}
