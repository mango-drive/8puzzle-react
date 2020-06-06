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

    isEmpty() {
        return this._data.length === 0;
    }

    heapify() {
        if(this.size() > 0) {
            for (let i = 1; i < this.size(); ++i) {
                this.bubbleUp(i);
            }
        }
    }

    bubbleUp(pos) {
        while(pos > 0) {
            let parent = Math.floor((pos-1)/2);
            // if the child is larger than the parent, we are done
            if (this.comparator(this._data[pos], this._data[parent]) > 0)
                break;
            
            // otherwise, swap child and parent to satisfy minHeap property
            this.swap(pos, parent);
            pos = parent;
        }
    }

    insert(value) {
        const i = this.size();
        this._data.push(value);
        this.bubbleUp(i);
    }

    bubbleDown(pos) {
        const firstLeaf = Math.floor(this.size() / 2)
        while(pos < firstLeaf) {
            const left = pos * 2 + 1;
            let children = [left];

            const right = left + 1;
            if (right < this.size()) children.push(right);

            let swapped = false;
            for (const cPos of children) {
                if (this.comparator(this._data[pos], this._data[cPos]) > 0) {
                    this.swap(pos, cPos)
                    pos = cPos;
                    swapped = true;
                    break;
                }
            }
            if (!swapped) break;
        }
    }

    extract() {
        if(this.isEmpty()) return null;
        const first = 0;
        const last = this.size() - 1;
        this.swap(first, last);
        // the previous root is now at the back of the array
        const value = this._data.pop();
        this.bubbleDown(first);
        return value;
    }

    swap(i, j) {
        const temp = this._data[i];
        this._data[i] = this._data[j];
        this._data[j] = temp;
    }
}