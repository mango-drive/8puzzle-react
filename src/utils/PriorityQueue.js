export default class PriorityQueue {
    constructor(data = [], comparator = defaultComparator) {
        this._data = data;
        this.comparator = comparator;
        this.heapify();
    }

    size() {
        return this._data.length;
    }

    get data() {
        return this._data;
    }

    heapify() {
        if(this.size() > 0) {
            for (let i = 1; i < this._data.length; ++i) {
                this.bubbleUp(i);
            }
        }
    }

    bubbleUp(pos) {
        while(pos > 0) {
            let parent = Math.floor(pos/2);
            // if the child is larger than the parent, we are done
            if (this.comparator(this._data[pos], this._data[parent]) > 0)
                break;
            
            // otherwise, swap child and parent to satisfy minHeap property
            this.swap(pos, parent);
        }
    }

    swap(i, j) {
        const temp = this._data[i];
        this._data[i] = this._data[j];
        this._data[j] = temp;
    }
}