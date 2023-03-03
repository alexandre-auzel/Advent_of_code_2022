import { formatInput } from "../utils/format";
import { flatten } from "lodash";

export const computeSignalPower = (input: string[]): [number, string[][]] => {
  let X = 1;
  let clock = 0;
  let index = 0;
  let executionTime: number = 0;
  let toAdd: number;
  let power = 0;
  let pixels: string[][] = Array.from(Array(6), () => new Array(40).fill("."));
  while (index < input.length) {
    clock++;
    //---------START & DURING
    if (executionTime === 0) {
      //New instruction
      const line = input[index];
      if (line === "noop") {
        executionTime = 1;
        toAdd = 0;
      } else {
        executionTime = 2;
        toAdd = parseInt(line.split(" ")[1]);
      }
    }
    //CRT
    const pixelDrawnY = (clock - 1) % 40;
    const pixelDrawnX = Math.floor((clock - 1) / 40);
    if (Math.abs(pixelDrawnY - X) <= 1) {
      pixels[pixelDrawnX][pixelDrawnY] = "#";
    }
    //Compute power
    if ((clock - 20) % 40 === 0) {
      power += X * clock;
    }
    //---------
    executionTime--;
    if (executionTime === 0) {
      //Instruction finished
      X += toAdd;
      index++;
    }
    //---------END
  }
  return [power, pixels];
};
export const day10 = () => {
  const input = formatInput("Day10/input.txt").returnLine;
  const [power, pixels] = computeSignalPower(input);
  console.log(power);
  console.log(pixels.map((row) => row.join("")).join("\n"));
};
