import { day13, isInOrder } from ".";

describe("", () => {
  test("", () => {
    // GIVEN

    // WHEN
    const actual = isInOrder([
      [1, 1, 3, 1, 1],
      [1, 1, 5, 1, 1],
    ]);

    expect(actual).toEqual("order");
  });
  test("", () => {
    // GIVEN

    // WHEN
    const actual = isInOrder([
      [[1], [2, 3, 4]],
      [[1], 4],
    ]);

    expect(actual).toEqual("order");
  });
  test("", () => {
    // GIVEN

    // WHEN
    const actual = isInOrder([[9], [[8, 7, 6]]]);

    expect(actual).toEqual("not-order");
  });

  test("", () => {
    // GIVEN

    // WHEN
    const actual = isInOrder([
      [[4, 4], 4, 4],
      [[4, 4], 4, 4, 4],
    ]);

    expect(actual).toEqual("order");
  });

  test("", () => {
    // GIVEN

    // WHEN
    const actual = isInOrder([
      [7, 7, 7, 7],
      [7, 7, 7],
    ]);

    expect(actual).toEqual("not-order");
  });
  test("", () => {
    // GIVEN

    // WHEN
    const actual = isInOrder([[], [3]]);

    expect(actual).toEqual("order");
  });
  test("", () => {
    // GIVEN

    // WHEN
    const actual = isInOrder([[[[]]], [[]]]);

    expect(actual).toEqual("not-order");
  });
  test("", () => {
    // GIVEN

    // WHEN
    const actual = isInOrder([
      [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
      [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
    ]);

    expect(actual).toEqual("not-order");
  });
  test("", () => {
    const res = day13();
  });
});
