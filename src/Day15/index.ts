import { formatInput } from "../utils/format";
export const computeRadius = (input: number[][]) => {
  return input.map((row) => Math.abs(row[0] - row[2]) + Math.abs(row[1] - row[3]));
};
export const maxMinX = (input: number[][], radius: number[]) => {
  const maxX = input.reduce((acc, row, i) => {
    if (row[0] + radius[i] >= acc) {
      return row[0] + radius[i];
    }
    return acc;
  }, -Number.MAX_SAFE_INTEGER);
  const minX = input.reduce((acc, row, i) => {
    if (row[0] - radius[i] <= acc) {
      return row[0] - radius[i];
    }
    return acc;
  }, Number.MAX_SAFE_INTEGER);

  return [minX, maxX];
};
export const computeCount = (input: number[][], y: number) => {
  const radius = computeRadius(input);
  const [minX, maxX] = maxMinX(input, radius);

  let count = 0;
  let x = minX;
  while (x < maxX) {
    console.log(`${x - minX}/${maxX - minX} -> ${count}`); //

    const difInRadius = input.reduce((acc, row, i) => {
      const distancePointSensor = Math.abs(row[0] - x) + Math.abs(row[1] - y);
      const difRadius = radius[i] - distancePointSensor;
      if (difRadius >= acc) {
        return difRadius;
      }
      return acc;
    }, -1);
    if (difInRadius >= 0) {
      count = count + difInRadius + 1;
      x = x + difInRadius + 1;
    } else {
      x = x + 1;
    }
  }
  const beaconsX = [];
  input.forEach((row) => {
    if (row[3] === y && row[2] <= maxX && row[2] >= minX && !beaconsX.find((beacon) => beacon === row[2])) {
      beaconsX.push(row[2]);
    }
  });
  return count - beaconsX.length;
};
export const day15 = () => {
  const input = formatInput("Day15/input.txt").returnLine.map((row) => {
    const sensorRaw = row.split("at x=")[1];
    const beaconRaw = row.split("at x=")[2];
    const sX = parseInt(sensorRaw.split(", ")[0]);
    const sY = parseInt(sensorRaw.split("y=")[1].split(": ")[0]);
    const bX = parseInt(beaconRaw.split(", ")[0]);
    const bY = parseInt(beaconRaw.split("y=")[1]);
    return [sX, sY, bX, bY];
  });

  const count = computeCount(input, 2000000);

  console.log(count);
};

day15();
