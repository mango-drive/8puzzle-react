import {
    swap, 
    neighboursOfIdx,
    deepCopy
} from './util'

export const hamming = (arr) => {
    let count = 0;
    const n = arr.length;

    for(let i = 0; i < n; ++i) {
        for(let j=0; j < n; ++j) {
            const val = arr[i][j];
            const correctPosition = i*n + j+1;
            if(val != 0 && val != correctPosition) {
                count++;
            }
        }
    }
    return count;
} 

export const manhattan = (arr) => {
    let manhattan = 0;
    const n = arr.length;

    for (let i = 0; i < n; ++i) {
        for(let j=0; j < n; ++j) {
            const val = arr[i][j];
            if (val != 0) {
                const goal_i = Math.floor((val - 1) / n);
                const goal_j = (val - 1) % n;
                manhattan += Math.abs(goal_i - i) + Math.abs(goal_j - j);
            }
        }
    }

    return manhattan;
}

export const isGoal = (arr) => {
    return hamming(arr) == 0;
}

export const generateNeighborArrays = (arr, idx) => {
    const neighborArrays = [];
    for(const idx2 of neighboursOfIdx(arr, idx)) {
        const neigborArray = deepCopy(arr);
        swap(neigborArray, idx, idx2);
        neighborArrays.push(neigborArray);
    }
    return neighborArrays;
}
