import { shuffle, findZero, createGridLayout } from "../utils/util";
import { countInversions } from "../utils/solve";

test("findZero", () => {
  const arr = [
    [1, 0],
    [2, 3],
  ];
  const zeroIdx = findZero(arr);
  expect(zeroIdx).toEqual({ i: 0, j: 1 });
});

test("shuffles an array", () => {
  let permutations = {
    "123": 0,
    "132": 0,
    "213": 0,
    "231": 0,
    "321": 0,
    "312": 0,
  };

  for (let i = 0; i < 100000; i++) {
    const arr = [1, 2, 3];
    shuffle(arr);
    permutations[arr.join("")]++;
  }

  for (let key in permutations) {
    console.log(`${key}: ${permutations[key]}`);
  }
});
