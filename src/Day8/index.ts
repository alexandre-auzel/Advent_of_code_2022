import { join } from "path";
import { formatInput } from "../utils/format";
import { compact } from "lodash";
import { errorMonitor } from "events";

type Tree = {
  x: number;
  y: number;
  height: number;
};
const isIn = (visiblesTrees: Tree[], treeToAdd: Tree) => {
  return visiblesTrees.some((visibleTree) => treeToAdd.x === visibleTree.x && treeToAdd.y === visibleTree.y);
};
export const addTreesToRecords = (visiblesTrees: Tree[], treesToAdd: Tree[]) => {
  treesToAdd.forEach((tree) => {
    if (!isIn(visiblesTrees, tree)) {
      visiblesTrees.push(tree);
    }
  });
  return visiblesTrees;
};

export const extractVisibleTreesInARow = (row: string[], coord: { x?: number; y?: number }, reverse: boolean) => {
  const heights: (Tree | null)[] = [null, null, null, null, null, null, null, null, null, null];
  console.log(row);
  return compact(
    row.reduce((acc, heightS, index) => {
      const height = parseInt(heightS);
      if (acc.slice(height).some((tree) => !!tree)) {
        return acc;
      }
      acc[height] = {
        height: height,
        x: coord.x ?? (reverse ? row.length - index - 1 : index),
        y: coord.y ?? (reverse ? row.length - index - 1 : index),
      };
      return acc;
    }, heights)
  );
};
export const computeVisibleTrees = (forest: string[]) => {
  let visibleTrees: Tree[] = [];
  const maxX = forest[0].length;
  const maxY = forest.length;

  const forestAsAMatrix = forest.map((row) => {
    return row.split("");
  });

  console.log(extractVisibleTreesInARow(forestAsAMatrix[0], { y: 0 }, false));
  for (let i = 0; i < maxY; i++) {
    addTreesToRecords(visibleTrees, extractVisibleTreesInARow([...forestAsAMatrix[i]], { y: i }, false));
    addTreesToRecords(visibleTrees, extractVisibleTreesInARow([...forestAsAMatrix[i]].reverse(), { y: i }, true));
  }
  for (let i = 0; i < maxX; i++) {
    addTreesToRecords(
      visibleTrees,
      extractVisibleTreesInARow(
        forestAsAMatrix.map((value) => value[i]),
        { x: i },
        false
      )
    );
    addTreesToRecords(
      visibleTrees,
      extractVisibleTreesInARow(forestAsAMatrix.map((value) => value[i]).reverse(), { x: i }, true)
    );
  }
  // console.log(visibleTrees);
  // throw new Error("stop");

  return visibleTrees;
};
export const computeTreeScore = (x0: number, y0: number, matrix: string[][]) => {
  const maxX = matrix[0].length;
  const maxY = matrix.length;
  const treeHeight = parseInt(matrix[y0][x0]);
  let score = 1;
  let cursor = 1;
  if (x0 === 0 || x0 === maxX - 1 || y0 === 0 || y0 === maxY - 1) {
    return 0;
  }
  while (x0 + cursor < maxX && parseInt(matrix[y0][x0 + cursor]) < treeHeight) {
    cursor++;
  }
  if (x0 + cursor === maxX) {
    cursor--;
  }
  score = score * cursor;
  cursor = 1;
  while (x0 - cursor >= 0 && parseInt(matrix[y0][x0 - cursor]) < treeHeight) {
    cursor++;
  }
  if (x0 - cursor === -1) {
    cursor--;
  }
  score = score * cursor;

  cursor = 1;
  while (y0 + cursor < maxY && parseInt(matrix[y0 + cursor][x0]) < treeHeight) {
    cursor++;
  }
  if (y0 + cursor === maxY) {
    cursor--;
  }
  score = score * cursor;
  cursor = 1;
  while (y0 - cursor >= 0 && parseInt(matrix[y0 - cursor][x0]) < treeHeight) {
    cursor++;
  }
  if (y0 - cursor === -1) {
    cursor--;
  }
  score = score * cursor;

  return score;
};
const computeScenicScore = (forest: string[]) => {
  const matrix = forest.map((row) => {
    return row.split("");
  });
  const maxX = matrix[0].length;
  const maxY = matrix.length;
  let maxScore = -1;
  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      const currentScore = computeTreeScore(i, j, matrix);
      if (currentScore > maxScore) {
        maxScore = currentScore;
      }
    }
  }
  return maxScore;
};
export const day8 = () => {
  const forest = formatInput("Day8/input.txt").returnLine;
  const visibleTrees: Tree[] = computeVisibleTrees(forest);

  console.log("Number of visible tree: ", visibleTrees.length);

  const score = computeScenicScore(forest);

  console.log("Max Scenic score: ", score);
};
