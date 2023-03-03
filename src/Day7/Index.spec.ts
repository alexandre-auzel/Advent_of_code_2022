import { computePathAfterCD, constructTree, createDirectoryIfDoesntExist, day7, extractDirectChildren } from ".";

describe("", () => {
  test("", () => {
    // GIVEN

    // WHEN
    const actual = computePathAfterCD("..", "/dir1/dir2/dir3/");

    // THEN
    const expected = "/dir1/dir2/";
    expect(actual).toEqual(expected);
  });

  test("", () => {
    // GIVEN

    // WHEN
    const actual = computePathAfterCD("dir4", "/dir1/dir2/dir3/");

    // THEN
    const expected = "/dir1/dir2/dir3/dir4/";
    expect(actual).toEqual(expected);
  });

  test("", () => {
    // GIVEN
    const tree = [
      {
        path: "/dir1/dir2/dir3/",
      },
      {
        path: "/dir1/dir2/",
      },
      {
        path: "/dir1/",
      },
    ];
    // WHEN
    //@ts-expect-error
    const actual = createDirectoryIfDoesntExist("/dir1/dir2/dir3/", tree);

    // THEN
    expect(actual).toEqual(tree);
  });
  test("", () => {
    // GIVEN
    const tree = [
      {
        path: "/dir1/dir2/",
      },
      {
        path: "/dir1/",
      },
    ];
    // WHEN
    //@ts-expect-error
    const actual = createDirectoryIfDoesntExist("/dir1/dir2/dir3/", tree);

    // THEN
    expect(actual).toEqual([
      {
        path: "/dir1/dir2/",
      },
      {
        path: "/dir1/",
      },
      { path: "/dir1/dir2/dir3/", isFile: false, size: null },
    ]);
  });

  test("", () => {
    // GIVEN
    const input = ["$ cd /", "$ ls", "dir dir1", "$ cd dir1", "$ cd dir2", "$ ls", "dir dir3"];
    // WHEN
    const actual = constructTree(input);

    // THEN
    expect(actual).toEqual([
      {
        path: "/",
        isFile: false,
        size: null,
      },
      {
        path: "/dir1/",
        isFile: false,
        size: null,
      },
      {
        path: "/dir1/dir2/",
        isFile: false,
        size: null,
      },
      { path: "/dir1/dir2/dir3/", isFile: false, size: null },
    ]);
  });
  test("", () => {
    // GIVEN
    const input = ["$ cd /", "$ ls", "dir dir1", "$ cd dir1", "$ cd dir2", "$ ls", "dir dir3", "123 fil1"];
    // WHEN
    const actual = constructTree(input);

    // THEN
    expect(actual).toEqual([
      {
        path: "/",
        isFile: false,
        size: null,
      },
      {
        path: "/dir1/",
        isFile: false,
        size: null,
      },
      {
        path: "/dir1/dir2/",
        isFile: false,
        size: null,
      },
      { path: "/dir1/dir2/fil1", isFile: true, size: 123 },
      { path: "/dir1/dir2/dir3/", isFile: false, size: null },
    ]);
  });

  test("", () => {
    // GIVEN
    const input = [
      {
        path: "/",
        isFile: false,
        size: null,
      },
      {
        path: "/dir1/",
        isFile: false,
        size: null,
      },
      {
        path: "/dir1/dir2/",
        isFile: false,
        size: null,
      },
      { path: "/dir1/dir2/fil1", isFile: true, size: 123 },
      { path: "/dir1/dir2/dir3/", isFile: false, size: null },
    ];
    // WHEN
    const actual = extractDirectChildren(
      {
        path: "/",
        isFile: false,
        size: null,
      },
      input
    );

    // THEN
    expect(actual).toEqual([
      {
        path: "/dir1/",
        isFile: false,
        size: null,
      },
    ]);
  });

  test("", () => {
    // GIVEN
    const input = [
      {
        path: "/",
        isFile: false,
        size: null,
      },
      {
        path: "/dir1/",
        isFile: false,
        size: null,
      },
      {
        path: "/dir1/dir2/",
        isFile: false,
        size: null,
      },
      { path: "/dir1/dir2/fil1", isFile: true, size: 123 },
      { path: "/dir1/dir2/dir3/", isFile: false, size: null },
    ];
    // WHEN
    const actual = extractDirectChildren(
      {
        path: "/dir1/dir2/",
        isFile: false,
        size: null,
      },
      input
    );

    // THEN
    expect(actual).toEqual([
      { path: "/dir1/dir2/fil1", isFile: true, size: 123 },
      { path: "/dir1/dir2/dir3/", isFile: false, size: null },
    ]);
  });
  test.only("", () => {
    // GIVEN

    // WHEN
    const actual = day7();
    console.log(actual);

    // THEN
    const expected: number = 1;
    expect(actual).toEqual(expected);
  });
});
