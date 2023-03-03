import { buildMap, buildMap2, countSand, countSand2, day14, day14_2 } from ".";
const correctMap = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, true, false, false, false, true, true],
  [false, false, false, false, true, false, false, false, true, false],
  [false, false, true, true, true, false, false, false, true, false],
  [false, false, false, false, false, false, false, false, true, false],
  [false, false, false, false, false, false, false, false, true, false],
  [true, true, true, true, true, true, true, true, true, false],
];
describe("", () => {
  test("", () => {
    const map = buildMap([
      [
        [498, 4],
        [498, 6],
        [496, 6],
      ],
      [
        [503, 4],
        [502, 4],
        [502, 9],
        [494, 9],
      ],
    ]);

    expect(map).toEqual([correctMap, 494, 503, 4, 9]);
  });

  test("", () => {
    const map = buildMap2([
      [
        [498, 4],
        [498, 6],
        [496, 6],
      ],
      [
        [503, 4],
        [502, 4],
        [502, 9],
        [494, 9],
      ],
    ]);
    expect(map).toEqual([
      [498, 4],
      [498, 5],
      [498, 6],
      [496, 6],
      [497, 6],
      [502, 4],
      [503, 4],
      [502, 5],
      [502, 6],
      [502, 7],
      [502, 8],
      [502, 9],
      [494, 9],
      [495, 9],
      [496, 9],
      [497, 9],
      [498, 9],
      [499, 9],
      [500, 9],
      [501, 9],
    ]);
  });
  test("", () => {
    const res = countSand(correctMap, 494, 503, 0, 9);

    expect(res).toEqual(24);
  });

  test("", () => {
    const res = countSand2([
      [498, 4],
      [498, 5],
      [498, 6],
      [496, 6],
      [497, 6],
      [502, 4],
      [503, 4],
      [502, 5],
      [502, 6],
      [502, 7],
      [502, 8],
      [502, 9],
      [494, 9],
      [495, 9],
      [496, 9],
      [497, 9],
      [498, 9],
      [499, 9],
      [500, 9],
      [501, 9],
    ]);

    expect(res).toEqual(93);
  });

  test("", () => {
    const res = day14();
  });
  test.only("", () => {
    const res = day14_2();
  });
});
