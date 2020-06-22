import { findZero, createGridLayout } from "../utils/util";

test("createGridLayout", () => {
  const layout = createGridLayout(2, 10);
  const expected = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 0, y: 10 },
    { x: 10, y: 10 }
  ];

  expect(layout).toEqual(expected);
});

test("findZero", () => {
  const arr = [
    [1, 0],
    [2, 3],
  ];
  const zeroIdx = findZero(arr);
  expect(zeroIdx).toEqual({ i: 0, j: 1 });
});
