import { formatInput } from "../utils/format";
import { flatten } from "lodash";

export type Monkey = {
  id: number;
  items: number[];
  operation: {
    operationName: string;
    numberToUse: number;
  };
  test: {
    divider: number;
    destIfTrue: number;
    destIfFalse: number;
  };
};

const PPCM = 9699690;

const formatInitArray = (input: string) => {
  const byMonkey = input
    .split("Monkey ")
    .map((monkey) => monkey.split("\n").slice(0, -2))
    .slice(1);

  return byMonkey.map((inputMonkey): Monkey => {
    const id = parseInt(inputMonkey[0][0]);
    const items = inputMonkey[1]
      .split(": ")[1]
      .split(", ")
      .map((n) => parseInt(n));
    const operationName = inputMonkey[2].split("= ")[1][4];
    const numberToUse = parseInt(inputMonkey[2].split("= ")[1].split(`${operationName} `)[1]);
    const divider = parseInt(inputMonkey[3].split("by ")[1]);
    const destIfTrue = parseInt(inputMonkey[4].split("to monkey ")[1]);
    const destIfFalse = parseInt(inputMonkey[5].split("to monkey ")[1]);

    return {
      id,
      items,
      operation: {
        operationName,
        numberToUse,
      },
      test: {
        divider,
        destIfFalse,
        destIfTrue,
      },
    };
  });
};

export const computeRounds = (arr: Monkey[]) => {
  let res = new Array(arr.length).fill(0);
  for (let round = 0; round < 10000; round++) {
    console.count("round");
    for (let i = 0; i < arr.length; i++) {
      //loop over monkey
      const monkey = arr[i];
      monkey.items.forEach((item) => {
        res[i]++;
        const newItem = isNaN(monkey.operation.numberToUse)
          ? item * item
          : monkey.operation.operationName === "*"
          ? Math.floor((item * monkey.operation.numberToUse) / 1)
          : Math.floor((item + monkey.operation.numberToUse) / 1);

        //console.log(newItem % PPCM);
        if (newItem % monkey.test.divider === 0) {
          arr[monkey.test.destIfTrue].items.push(newItem % PPCM);
        } else {
          arr[monkey.test.destIfFalse].items.push(newItem % PPCM);
        }
      });
      arr[i].items = [];
    }
  }
  return res;
};
export const day11 = () => {
  const input = formatInput("Day11/input.txt").input;
  const initStateArray = formatInitArray(input);
  console.log(initStateArray);
  const monkeysNbOfItemsInspected = computeRounds(initStateArray);
  console.log(monkeysNbOfItemsInspected);
};
