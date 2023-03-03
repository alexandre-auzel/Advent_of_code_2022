import { formatInput } from "../utils/format";
import { compact } from "lodash";

type Packet = Array<number | Packet>;

export const isInOrder = (pair: [Packet, Packet]) => {
  const packet1 = pair[0];
  const packet2 = pair[1];
  // if(Number.isInteger(packet1) && Number.isInteger(packet2)){
  //   if(packet1 < packet2){
  //     return true
  //   } else if (packet1 > packet2){
  //     return false
  //   }
  //   return null;
  // } else if(Number.isInteger(packet1)){
  //   return isInOrder([[packet1], packet2])
  // } else if(Number.isInteger(packet2)){
  //   return isInOrder([packet1, [packet2]])
  // } else {
  let i = 0;
  while (i < packet1.length && i < packet2.length) {
    if (typeof packet1[i] === "number" && typeof packet2[i] === "number") {
      if (packet1[i] < packet2[i]) {
        return "order";
      } else if (packet1[i] > packet2[i]) {
        return "not-order";
      }
      i++;
    } else if (typeof packet1[i] === "number") {
      //@ts-expect-error
      const res = isInOrder([[packet1[i]], packet2[i]]);
      if (!res) {
        i++;
      } else {
        return res;
      }
    } else if (typeof packet2[i] === "number") {
      //@ts-expect-error
      const res = isInOrder([packet1[i], [packet2[i]]]);
      if (!res) {
        i++;
      } else {
        return res;
      }
    } else {
      //@ts-expect-error
      const res = isInOrder([packet1[i], packet2[i]]);
      if (!res) {
        i++;
      } else {
        return res;
      }
    }
  }
  if (i === packet1.length && i === packet2.length) {
    return null;
  } else if (i === packet1.length) {
    return "order";
  } else {
    return "not-order";
  }
};
export const day13 = () => {
  const input = formatInput("Day13/input.txt").doubleReturnLine;
  const pairInOrder = input.map((pair, index) =>
    isInOrder([JSON.parse(pair[0]), JSON.parse(pair[1])]) === "order" ? index + 1 : null
  );
  console.log(input, pairInOrder);
  console.log(pairInOrder.reduce((sum, el) => sum + el, 0));

  const packets = input.flat();
  packets.sort((a, b) => (isInOrder([JSON.parse(a), JSON.parse(b)]) === "order" ? -1 : 1));
  const dividersIndex = compact(
    packets.map((packet, index) => (packet === "[[2]]" || packet === "[[6]]" ? index + 1 : null))
  );
  console.log(dividersIndex[0] * dividersIndex[1]);
};
