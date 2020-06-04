import {
    isGoal,
    manhattan,
    hamming,
} from './solve'

test('hamming distance', () => {
    let tiles = [
        [1,3],
        [2,0]
    ]

    let hammingDistance = hamming(tiles);
    expect(hammingDistance).toEqual(2);

    tiles = [
        [3, 2],
        [1, 0]
    ]

    hammingDistance = hamming(tiles);
    expect(hammingDistance).toEqual(2);

    tiles = [
        [0, 3],
        [1, 2]
    ]

    hammingDistance = hamming(tiles);
    expect(hammingDistance).toEqual(3);

    tiles = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ]

    hammingDistance = hamming(tiles);
    expect(hammingDistance).toEqual(0);

    tiles = [
        [1, 3, 2],
        [4, 5, 6],
        [7, 8, 0]
    ]

    hammingDistance = hamming(tiles);
    expect(hammingDistance).toEqual(2);
})

test('manhattan distance', () => {
    let tiles = [
        [1,3],
        [2,0]
    ]

    let manhattanDistance = manhattan(tiles);
    expect(manhattanDistance).toEqual(4);

    tiles = [
        [3, 2],
        [1, 0]
    ]

    manhattanDistance = manhattan(tiles);
    expect(manhattanDistance).toEqual(2);

    tiles = [
        [0, 3],
        [1, 2]
    ]

    manhattanDistance = manhattan(tiles);
    expect(manhattanDistance).toEqual(4);

    tiles = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ]

    manhattanDistance = manhattan(tiles);
    expect(manhattanDistance).toEqual(0);

    tiles = [
        [1, 3, 2],
        [4, 5, 6],
        [7, 8, 0]
    ]

    manhattanDistance = manhattan(tiles);
    expect(manhattanDistance).toEqual(2);

})

test('isGoal', () => {
    let tiles = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0]
    ]

    let rv = isGoal(tiles);
    expect(rv).toEqual(true);

    tiles = [
        [1, 3, 2],
        [4, 5, 6],
        [7, 8, 0]
    ]

    rv = isGoal(tiles);
    expect(rv).toEqual(false);
})