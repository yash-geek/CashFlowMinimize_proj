
// let result = [];
// function getMin(arr) {
//     let minInd = 0;
//     for (let i = 1; i < arr.length; i++)
//         if (arr[i] < arr[minInd])
//             minInd = i;
//     return minInd;
// }

// function getMax(arr) {
//     let maxInd = 0;
//     for (let i = 1; i < arr.length; i++)
//         if (arr[i] > arr[maxInd])
//             maxInd = i;
//     return maxInd;
// }

// function minOf2(x, y) {
//     return (x < y) ? x : y;
// }

// function minCashFlowRec(amount) {

//     let mxCredit = getMax(amount), mxDebit = getMin(amount);

//     if (amount[mxCredit] === 0 && amount[mxDebit] === 0)
//         return;

//     let min = minOf2(-amount[mxDebit], amount[mxCredit]);
//     amount[mxCredit] -= min;
//     amount[mxDebit] += min;

//     let ans = [];
//     ans.push(`Person ${mxDebit + 1} pays ${min} to Person ${mxCredit + 1}`);
//     result.push(ans);
//     console.log(ans)

//     minCashFlowRec(amount);
// }

// export function minCashFlow(graph) {
//     let len = graph.length;
//     let amount = Array.from({ length: len }, (_, i) => 0);
//     console.log(graph);
//     for (let i = 0; i < len; i++)
//         for (let j = 0; j < len; j++)
//             amount[i] += (graph[j][i] - graph[i][j]);
//     result = [];
//     console.log(`amount is ${amount}`)
//     minCashFlowRec(amount)
//     console.log(result)
//     return result;
// }

// export default minCashFlow;
class Pair {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
}

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(pair) {
        this.heap.push(pair);
        this._heapifyUp(this.heap.length - 1);
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this._heapifyDown(0);
        }
        return max;
    }

    _heapifyUp(index) {
        let parent = Math.floor((index - 1) / 2);
        while (index > 0 && this._compare(this.heap[index], this.heap[parent]) > 0) {
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }

    _heapifyDown(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let largest = index;

        if (left < this.heap.length && this._compare(this.heap[left], this.heap[largest]) > 0) {
            largest = left;
        }

        if (right < this.heap.length && this._compare(this.heap[right], this.heap[largest]) > 0) {
            largest = right;
        }

        if (largest !== index) {
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            this._heapifyDown(largest);
        }
    }

    _compare(pair1, pair2) {
        if (pair1.first !== pair2.first) {
            return pair1.first - pair2.first;
        }
        return pair2.second - pair1.second;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(pair) {
        this.heap.push(pair);
        this._heapifyUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this._heapifyDown(0);
        }
        return min;
    }

    _heapifyUp(index) {
        let parent = Math.floor((index - 1) / 2);
        while (index > 0 && this._compare(this.heap[index], this.heap[parent]) < 0) {
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }

    _heapifyDown(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;

        if (left < this.heap.length && this._compare(this.heap[left], this.heap[smallest]) < 0) {
            smallest = left;
        }

        if (right < this.heap.length && this._compare(this.heap[right], this.heap[smallest]) < 0) {
            smallest = right;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this._heapifyDown(smallest);
        }
    }

    _compare(pair1, pair2) {
        if (pair1.first !== pair2.first) {
            return pair1.first - pair2.first;
        }
        return pair1.second - pair2.second;
    }
}

function minOf2(x, y) {
    return (x < y) ? x : y;
}

function minCashFlowRec(maxH, minH, result) {
    if (maxH.heap.length === 0 || minH.heap.length === 0) return;

    let mxCredit = maxH.extractMax();
    let mxDebit = minH.extractMin();
    //console.log(`maxCredit : ${mxCredit.first} mxDebit : ${mxDebit.first}`)

    if (mxCredit.first === 0 || mxDebit.first === 0) return;

    let min = minOf2(Math.abs(mxDebit.first), Math.abs(mxCredit.first));
    mxCredit.first -= min;
    mxDebit.first += min;

    let ans = [];
    ans.push(`Person ${mxDebit.second + 1} pays ${min} to Person ${mxCredit.second + 1}`);
    result.push(ans);
    maxH.insert(mxCredit);
    minH.insert(mxDebit);
    minCashFlowRec(maxH, minH, result);
}

export function minCashFlow(graph) {
    let len = graph.length;
    let MaxH = new MaxHeap();
    let MinH = new MinHeap();
    let result = []; // Declare result here
    //console.log(graph);
    //const arr = []
    for (let i = 0; i < len; i++) {
        let sum = 0;
        for (let j = 0; j < len; j++) {
            sum += (graph[j][i] - graph[i][j]);
        }
        //arr.push(new Pair(sum,i));
        MaxH.insert(new Pair(sum, i));
        MinH.insert(new Pair(sum, i));
    }
    // console.log(`max heap : ${MaxH} min heap: ${MinH}`)
    //console.log(arr)
    minCashFlowRec(MaxH, MinH, result);
    //console.log(result);

    return result;
}
export default minCashFlow;







