import {
    hamming,
} from './solve.js'

test('hamming distance', () => {
    let tiles = [
        [1,3],
        [2,0]
    ]

    const hammingDistance = hamming(tiles);
    expect(hammingDistance).toEqual(1);
})