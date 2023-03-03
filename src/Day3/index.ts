import { readFileSync } from "fs";

const commonItem = (s1: string, s2: string) => {
  for (let i = 0; i < s1.length; i++) {
    if (s2.includes(s1[i])) {
      return s1[i];
    }
  }
  throw new Error("no common item in compartiments");
};

export const computePriority = (char: string) => {
  const isUpperCase = char.toUpperCase() === char;
  return isUpperCase ? char.charCodeAt(0) - 64 + 26 : char.charCodeAt(0) - 96;
};

const computeSackScore = (sack: string) => {
  const comp1 = sack.slice(0, sack.length / 2);
  const comp2 = sack.slice(sack.length / 2);
  const wrongItem = commonItem(comp1, comp2);

  return computePriority(wrongItem);
};
export const day3 = () => {
  const input = readFileSync("./src/Day3/input.txt", "utf8");
  const sacks = input.split("\n").slice(0, -1);
  const totalscore = sacks.reduce((sum, sack) => {
    return sum + computeSackScore(sack);
  }, 0);

  console.log(totalscore);
};

export const computeGroupBadge = (s1: string, s2: string, s3: string) => {
  for (let i = 0; i < s1.length; i++) {
    if (s2.includes(s1[i]) && s3.includes(s1[i])) {
      return s1[i];
    }
  }
  throw new Error("no common item in sacks");
};

export const day3_bis = () => {
  const input = readFileSync("./src/Day3/input.txt", "utf8");
  const sacks = input.split("\n").slice(0, -1);
  const score = sacks.reduce((sum, el, index, array) => {
    if (index % 3 === 0) {
      return sum + computePriority(computeGroupBadge(el, array[index + 1], array[index + 2]));
    } else {
      return sum;
    }
  }, 0);

  console.log(score);
};
