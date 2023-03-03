import { computeFinalStacks, day5 } from ".";

describe("", () => {
  test("", () => {
    // GIVEN
    const stacks = [["A"], ["B"], ["C"]];
    // WHEN
    const actual = computeFinalStacks(stacks, ["move 1 from 1 to 3", "move 1 from 2 to 3"]);

    // THEN
    const expected: number = 1;
    expect(actual).toEqual([[], [], ["C", "A", "B"]]);
  });

  test("", () => {
    // GIVEN
    const stacks = [["A", "D"], ["B"], ["C"]];
    // WHEN
    const actual = computeFinalStacks(stacks, ["move 2 from 1 to 3", "move 1 from 3 to 2"]);

    // THEN
    const expected: number = 1;
    expect(actual).toEqual([[], ["B", "D"], ["C", "A"]]);
  });

  test("", () => {
    // GIVEN
    const stacks = [["A", "D"], ["B"], ["C"]];
    // WHEN
    const actual = computeFinalStacks(stacks, ["move 2 from 1 to 3", "move 1 from 3 to 2", "move 2 from 2 to 1"]);

    // THEN
    const expected: number = 1;
    expect(actual).toEqual([["B", "D"], [], ["C", "A"]]);
  });
  test("", () => {
    // GIVEN

    // WHEN
    const actual = day5();
    console.log(actual);

    // THEN
    const expected: number = 1;
    expect(actual).toEqual(expected);
  });
});
