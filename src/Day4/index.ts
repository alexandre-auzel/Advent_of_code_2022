import { readFileSync } from "fs";
import { formatInput } from "../utils/format";

const isOneRangeIncludedInAnother = (pair: string) => {
  const [range1, range2] = pair.split(",");
  const min1 = parseInt(range1.split("-")[0]);
  const min2 = parseInt(range2.split("-")[0]);
  const max1 = parseInt(range1.split("-")[1]);
  const max2 = parseInt(range2.split("-")[1]);

  return (min1 <= min2 && max2 <= max1) || (min2 <= min1 && max1 <= max2);
};

const isPairOverlapping = (pair: string) => {
  const [range1, range2] = pair.split(",");
  const min1 = parseInt(range1.split("-")[0]);
  const min2 = parseInt(range2.split("-")[0]);
  const max1 = parseInt(range1.split("-")[1]);
  const max2 = parseInt(range2.split("-")[1]);

  return (max1 >= min2 && min1 <= max2) || (max2 >= min1 && min2 <= max1);
};

export const day4 = () => {
  const pairs = formatInput("Day4/input.txt").returnLine;
  return pairs.reduce((acc, pair) => {
    if (isPairOverlapping(pair)) {
      return acc + 1;
    }
    return acc;
  }, 0);
};
