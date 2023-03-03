import { computeTreeScore, day8 } from ".";

describe("", () => {
  test("", () => {
    // GIVEN
    const mat = [
      ["3", "0", "3", "7", "3"],
      ["2", "5", "5", "1", "2"],
      ["6", "5", "3", "3", "2"],
      ["3", "3", "5", "4", "9"],
      ["3", "5", "3", "9", "0"],
    ];
    // WHEN
    const actual = computeTreeScore(2, 1, mat);

    // THEN
    const expected: number = 4;
    expect(actual).toEqual(expected);
  });

  test("", () => {
    // GIVEN
    const mat = [
      ["3", "0", "3", "7", "3"],
      ["2", "5", "5", "1", "2"],
      ["6", "5", "3", "3", "2"],
      ["3", "3", "5", "4", "9"],
      ["3", "5", "3", "9", "0"],
    ];
    // WHEN
    const actual = computeTreeScore(2, 3, mat);

    // THEN
    const expected: number = 8;
    expect(actual).toEqual(expected);
  });
  test("", () => {
    // GIVEN

    // WHEN
    const actual = day8();

    // THEN
    const expected: number = 1;
    expect(actual).toEqual(expected);
  });
});
