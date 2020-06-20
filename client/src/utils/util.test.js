import {
  findZero,
} from "./util";

test("findZero", () => {
  const arr = [
    [1, 0],
    [2, 3],
  ];
  const zeroIdx = findZero(arr);
  expect(zeroIdx).toEqual({ i: 0, j: 1 });
});
