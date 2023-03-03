import { join } from "path";
import { formatInput } from "../utils/format";

const computeNumberOfStack = () => {
  const input = formatInput("Day5/input.txt").returnLine;
  for (let i = 0; i < input.length; i++) {
    if (!input[i].includes("[")) {
      return input[i].split("   ").length;
    }
  }
};

const computeStacks = (nbStack: number) => {
  const input = formatInput("Day5/input.txt").returnLine;
  let res: string[][] = Array.from(Array(nbStack), () => []);
  for (let i = 0; i < input.length; i++) {
    if (!input[i].includes("[")) {
      return res.map((stack) => stack.reverse());
    }
    for (let j = 1; j < input[i].length; j = j + 4) {
      if (input[i][j] !== " ") {
        res[(j - 1) / 4].push(input[i][j]);
      }
    }
  }
};

const extractParam = (s: string) => {
  const stab = s.split(" ");
  return [parseInt(stab[1]), parseInt(stab[3]), parseInt(stab[5])];
};

export const computeFinalStacks = (stacks: string[][], input: string[]) => {
  // console.log("stacks: ", stacks);
  // const crateToMove = stacks[0].pop();
  // stacks[1].push(crateToMove);
  // console.log("stacks: après", stacks);

  for (let i = 0; i < input.length; i++) {
    const [nbCratesToMove, from, to] = extractParam(input[i]);
    const cratesToMove = [...stacks[from - 1].slice(-nbCratesToMove)];
    console.log(cratesToMove);
    stacks[to - 1] = stacks[to - 1].concat(cratesToMove);
    for (let j = 0; j < nbCratesToMove; j++) {
      stacks[from - 1].pop();
    }
  }
  return stacks;
};

export const day5 = () => {
  const nbStack = computeNumberOfStack();
  const stacks = computeStacks(nbStack);
  const input = formatInput("./Day5/input.txt").doubleReturnLine;
  const finalStacks = computeFinalStacks(stacks, input[1]);
  console.log(finalStacks.map((s) => s[s.length - 1]).join(""));
};
