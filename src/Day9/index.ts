import { formatInput } from "../utils/format";
import { flatten } from "lodash";

const newHeadPosition = (hx: number, hy: number, direction: string): [number, number] => {
  if (direction === "U") {
    return [hx, hy + 1];
  }
  if (direction === "D") {
    return [hx, hy - 1];
  }
  if (direction === "L") {
    return [hx - 1, hy];
  }
  if (direction === "R") {
    return [hx + 1, hy];
  }
};

const newTailPosition = (tx: number, ty: number, hx: number, hy: number): [number, number] => {
  const difX = hx - tx;
  const difY = hy - ty;
  if (difX === 0 && difY === 0) {
    return [tx, ty];
  }
  if (difX === 0 && difY === 0) {
    return [tx, ty];
  }
  if ((Math.abs(difX) === 1 && difY === 0) || (difX === 0 && Math.abs(difY) === 1)) {
    return [tx, ty];
  }
  if (difY === 0 && Math.abs(difX) === 2) {
    return [tx + 1 * Math.sign(difX), ty];
  }
  if (difX === 0 && Math.abs(difY) === 2) {
    return [tx, ty + 1 * Math.sign(difY)];
  }
  if (Math.abs(difX) === 1 && Math.abs(difY) === 1) {
    return [tx, ty];
  }
  if ((Math.abs(difX) === 2 && Math.abs(difY) === 1) || (Math.abs(difX) === 1 && Math.abs(difY) === 2)) {
    return [tx + 1 * Math.sign(difX), ty + 1 * Math.sign(difY)];
  }
  if ((Math.abs(difX) === 2 && Math.abs(difY) === 2) || (Math.abs(difX) === 2 && Math.abs(difY) === 2)) {
    return [tx + 1 * Math.sign(difX), ty + 1 * Math.sign(difY)];
  }
};

export const computeTailPositions = (headMoves: string[], length: number) => {
  let knotPositions: [number, number][][] = Array.from(Array(length), () => []);
  knotPositions.forEach((knot) => knot.push([0, 0]));
  const flattenHeadMoves = flatten(
    headMoves.map((concatenateMove) => {
      const [direction, step] = concatenateMove.split(" ");
      const flattenMove = new Array(parseInt(step)).fill(direction);
      return flattenMove;
    })
  );

  console.log(flattenHeadMoves.length);
  flattenHeadMoves.reduce(
    (acc, direction: string) => {
      const [hX, hY] = newHeadPosition(acc[0], acc[1], direction);

      let previousX = hX;
      let previousY = hY;
      for (let i = 0; i < length; i++) {
        const currentPosition = knotPositions[i][knotPositions[i].length - 1];
        const newPosition = newTailPosition(currentPosition[0], currentPosition[1], previousX, previousY);
        knotPositions[i].push([newPosition[0], newPosition[1]]);
        previousX = newPosition[0];
        previousY = newPosition[1];
      }
      return [hX, hY];
    },
    [0, 0]
  );

  return knotPositions;
};

const removeDuplicate = (arr: [number, number][]) => {
  let res = [];
  arr.forEach((el) => {
    if (!!res.find((pos) => pos[0] === el[0] && pos[1] === el[1])) {
      return;
    }
    res.push(el);
  });
  return res;
};
export const day9 = () => {
  const input = formatInput("Day9/input.txt").returnLine;
  const knotPositions = computeTailPositions(input, 1);
  console.log(removeDuplicate(knotPositions[0]).length);
  const knotPositions2 = computeTailPositions(input, 9);
  console.log(removeDuplicate(knotPositions2[8]).length);
};
