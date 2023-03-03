import { join } from "path";
import { formatInput } from "../utils/format";

const hasOnlyDifferentChar = (s: string) => {
  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < s.length; j++) {
      if (s[i] === s[j] && i !== j) {
        return false;
      }
    }
  }
  return true;
};
export const day6 = () => {
  const input = formatInput("Day6/input.txt").input;

  for (let i = 14; i < input.length; i++) {
    if (hasOnlyDifferentChar(input.slice(i - 14, i))) {
      return i;
    }
  }
};
