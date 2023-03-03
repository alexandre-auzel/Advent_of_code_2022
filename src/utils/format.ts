import { readFileSync } from "fs";

const clean = (arr: string[]) => {
  return arr[arr.length - 1] === "" ? arr.slice(0, -1) : arr;
};

export const formatInput = (filePath: string) => {
  const input = readFileSync(`./src/${filePath}`, "utf8");
  const returnLine = input.split("\n");
  const doubleReturnLine = input.split("\n\n").map((group) => clean(group.split("\n")));
  const returnLineCleaned = clean(returnLine);
  const returnLineAndSpace = returnLineCleaned.map((line) => line.split(" "));

  return {
    input,
    returnLine: returnLineCleaned,
    returnLineAndSpace,
    doubleReturnLine,
  };
};
