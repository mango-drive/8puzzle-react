import PriorityQueue from '../utils/PriorityQueue'

test('minPQ heapifies on construction', () => {
    const data = [1, 5, 3, 2, 1];
    const minPQ = new PriorityQueue(data, (a, b) => a - b );
    expect(minPQ.data).toEqual([1, 1, 3, 5, 2]);
})

test('Priority Queue maintains heap property after push', () => {
    const data = [1, 5, 3, 2, 1];
    const minPQ = new PriorityQueue(data, (a, b) => a - b );
    minPQ.insert(10);
    expect(minPQ.data).toEqual([1, 1, 3, 5, 2, 10]);
    minPQ.insert(1);
    expect(minPQ.data).toEqual([1, 1, 1, 5, 2, 10, 3]);
}) 

test('Priority Queue maintains heap property after pop', () => {
    const data = [1, 5, 3, 2, 1];
    const minPQ = new PriorityQueue(data, (a, b) => a - b);
    let min = minPQ.extract();
    expect(min).toEqual(1);
    expect(minPQ.data).toEqual([1, 2, 3, 5]);
    min = minPQ.extract();
    expect(min).toEqual(1);
    expect(minPQ.data).toEqual([2, 5, 3]);
})