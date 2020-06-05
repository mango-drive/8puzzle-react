import PriorityQueue from './PriorityQueue'

test('minPQ heapifies on construction', () => {
    const data = [1, 5, 3, 2, 1];
    const minPQ = new PriorityQueue(data, (a, b) => a - b );
    expect(minPQ.data).toEqual([1, 2, 1, 3, 5]);
})