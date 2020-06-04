
export const hamming = (arr) => {
    let count = 0;
    let n = arr.length;

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