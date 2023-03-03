import { formatInput } from "../utils/format";
import { flatten } from "lodash";

export const computeNeighbors = (matrix: number[][]): number[][] => {
  let neighbors = Array.from(new Array(matrix.length * matrix[0].length), () => []);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (i - 1 >= 0 && matrix[i - 1][j] >= matrix[i][j] - 1) {
        neighbors[i * matrix[0].length + j].push(matrix[0].length * (i - 1) + j);
      }
      if (i + 1 < matrix.length && matrix[i + 1][j] >= matrix[i][j] - 1) {
        neighbors[i * matrix[0].length + j].push(matrix[0].length * (i + 1) + j);
      }
      if (j + 1 < matrix[0].length && matrix[i][j + 1] >= matrix[i][j] - 1) {
        neighbors[i * matrix[0].length + j].push(matrix[0].length * i + j + 1);
      }
      if (j - 1 >= 0 && matrix[i][j - 1] >= matrix[i][j] - 1) {
        neighbors[i * matrix[0].length + j].push(matrix[0].length * i + j - 1);
      }
    }
  }
  return neighbors;
};

const extractStartAndEnd = (matrix: string[][]) => {
  let start = -1;
  let end = -1;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "S") {
        start = i * matrix[0].length + j;
      }
      if (matrix[i][j] === "E") {
        end = i * matrix[0].length + j;
      }
    }
  }
  return [start, end];
};
const extractMin = (p: number[], d: number[]) => {
  let min = Number.MAX_SAFE_INTEGER;
  let minIndex = -1;
  d.forEach((el, index) => {
    if (!p.includes(index) && el <= min) {
      min = el;
      minIndex = index;
    }
  });
  return minIndex;
};
const dijkstra = (v: number[][], s: number) => {
  let visited = [];
  let d = new Array(v.length).fill(Number.MAX_SAFE_INTEGER);
  d[s] = 0;
  while (visited.length < v.length - 1) {
    const a = extractMin(visited, d);
    visited.push(a);
    v[a].forEach((voisin) => {
      if (!visited.includes(voisin)) {
        if (d[voisin] > d[a] + 1) {
          d[voisin] = d[a] + 1;
        }
      }
    });
  }
  return d;
};
export const day12 = () => {
  const input = formatInput("Day12/input.txt").returnLine;
  const matrix = input.map((row) => row.split(""));
  const [start, end] = extractStartAndEnd(matrix);
  const numberMatrix = matrix.map((row) =>
    row.map((c) => {
      if (c === "S") {
        return "a".charCodeAt(0);
      }
      if (c === "E") {
        return "z".charCodeAt(0);
      }
      return c.charCodeAt(0);
    })
  );
  const graph = computeNeighbors(numberMatrix);
  console.log(graph.length);
  const distances = dijkstra(graph, end);
  console.log(distances[start]);
  console.log(
    distances.reduce((min, dist, index) => {
      console.log(dist, index);
      if (dist <= min && matrix[Math.floor(index / matrix[0].length)][index % matrix[0].length] === "a") {
        return dist;
      }
      return min;
    }, Number.MAX_SAFE_INTEGER)
  );
};
