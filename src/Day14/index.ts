import { formatInput } from "../utils/format";

const min = (n1: number, n2: number) => (n1 < n2 ? n1 : n2);
const max = (n1: number, n2: number) => (n1 > n2 ? n1 : n2);

const getDimensions = (input: number[][][]) => {
  const points = input.flat();

  return points.reduce(
    (acc, coord) => {
      const [x, y] = coord;
      if (x <= acc[0]) {
        acc[0] = x;
      }
      if (x >= acc[1]) {
        acc[1] = x;
      }
      if (y <= acc[2]) {
        acc[2] = y;
      }
      if (y >= acc[3]) {
        acc[3] = y;
      }
      return acc;
    },
    [Number.MAX_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER, 0]
  );
};

export const buildMap = (input: number[][][]): [boolean[][], number, number, number, number] => {
  const [minX, maxX, minY, maxY] = getDimensions(input);
  const map: boolean[][] = Array.from(Array(maxY + 1), () => new Array(maxX - minX + 1).fill(false));
  input.forEach((path) => {
    for (let i = 0; i < path.length - 1; i++) {
      const point1 = path[i];
      const point2 = path[i + 1];
      for (let x = min(point1[0], point2[0]); x <= max(point1[0], point2[0]); x++) {
        for (let y = min(point1[1], point2[1]); y <= max(point1[1], point2[1]); y++) {
          map[y][x - minX] = true;
        }
      }
    }
  });
  return [map, minX, maxX, minY, maxY];
};

export const countSand = (map: boolean[][], minX: number, maxX: number, minY: number, maxY: number) => {
  const source = [0, 500];
  let count = 0;
  let out = false;
  while (!out) {
    let [y, x] = source;
    let rest = false;
    while (!rest) {
      if (
        y === maxY ||
        (x === minX && map[y + 1][x - minX]) ||
        (x === maxX && map[y + 1][x - minX] && map[y + 1][x - minX - 1])
      ) {
        out = true;
        break;
      }
      if (!map[y + 1][x - minX]) {
        y = y + 1;
      } else if (!map[y + 1][x - minX - 1]) {
        x = x - 1;
        y = y + 1;
      } else if (!map[y + 1][x - minX + 1]) {
        x = x + 1;
        y = y + 1;
      } else {
        rest = true;
      }
    }
    if (!out) {
      map[y][x - minX] = true;
      count++;
    }
  }
  return count;
};

export const day14 = () => {
  const input = formatInput("Day14/input.txt").returnLine.map((row) =>
    row.split(" -> ").map((coord) => coord.split(",").map((ns) => parseInt(ns)))
  );
  const [map, minX, maxX, minY, maxY] = buildMap(input);

  console.log(countSand(map, minX, maxX, minY, maxY));
};

export const buildMap2 = (input: number[][][]): [number, number][] => {
  let full: [number, number][] = [];
  input.forEach((path) => {
    for (let i = 0; i < path.length - 1; i++) {
      const point1 = path[i];
      const point2 = path[i + 1];
      for (let x = min(point1[0], point2[0]); x <= max(point1[0], point2[0]); x++) {
        for (let y = min(point1[1], point2[1]); y <= max(point1[1], point2[1]); y++) {
          if (!full.find((coord) => coord[0] === x && coord[1] === y)) {
            full.push([x, y]);
          }
        }
      }
    }
  });

  return full;
};

const isFull = (full: [number, number][], x: number, y: number, soil: number) => {
  return Boolean(y === soil || full.find((coord) => coord[0] === x && coord[1] === y));
};

export const countSand2 = (map: [number, number][]) => {
  const source = [0, 500];
  const soil =
    map.reduce((acc, coord) => {
      if (coord[1] > acc) {
        return coord[1];
      }
      return acc;
    }, 0) + 2;

  let count = 0;
  let [y, x] = [-1, -1];
  while (y !== 0 || x !== 500) {
    [y, x] = source;
    let rest = false;
    while (!rest) {
      if (!isFull(map, x, y + 1, soil)) {
        y = y + 1;
      } else if (!isFull(map, x - 1, y + 1, soil)) {
        x = x - 1;
        y = y + 1;
      } else if (!isFull(map, x + 1, y + 1, soil)) {
        x = x + 1;
        y = y + 1;
      } else {
        rest = true;
      }
    }
    map.push([x, y]);
    console.log({ x, y });
    count++;
  }
  return count;
};

export const day14_2 = () => {
  const input = formatInput("Day14/input.txt").returnLine.map((row) =>
    row.split(" -> ").map((coord) => coord.split(",").map((ns) => parseInt(ns)))
  );
  const rocks = buildMap2(input);

  console.log(countSand2(rocks));
};
