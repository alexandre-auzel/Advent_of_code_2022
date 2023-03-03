import { computeRounds, day11, Monkey } from ".";

describe("", () => {
  test("", () => {
    //GIVEN
    const given: Monkey[] = [
      {
        id: 0,
        items: [79, 98],
        operation: {
          operationName: "*",
          numberToUse: 19,
        },
        test: {
          divider: 23,
          destIfFalse: 3,
          destIfTrue: 2,
        },
      },
      {
        id: 1,
        items: [54, 65, 75, 74],
        operation: {
          operationName: "+",
          numberToUse: 6,
        },
        test: {
          divider: 19,
          destIfFalse: 0,
          destIfTrue: 2,
        },
      },
      {
        id: 2,
        items: [79, 60, 97],
        operation: {
          operationName: "*",
          numberToUse: Number.NaN,
        },
        test: {
          divider: 13,
          destIfFalse: 3,
          destIfTrue: 1,
        },
      },
      {
        id: 3,
        items: [74],
        operation: {
          operationName: "+",
          numberToUse: 3,
        },
        test: {
          divider: 17,
          destIfFalse: 1,
          destIfTrue: 0,
        },
      },
    ];
    // WHEN
    const actual = computeRounds(given);

    // THEN
    const expected = [101, 95, 7, 105];
    expect(actual).toEqual(expected);
  });

  test("", () => {
    // GIVEN

    // WHEN
    const actual = day11();
    // THEN
  });
});
