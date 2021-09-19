type Comparator<T> = (a: T, b: T) => boolean;

const MIN_HEAP_COMPARATOR = <T>(a: T, b: T): boolean => {
  return a < b;
};

const MAX_HEAP_COMPARATOR = <T>(a: T, b: T): boolean => {
  return b < a;
};

class Heap<T> {
  items: T[];
  compare: Comparator<T>;

  constructor(items: T[], comparator: Comparator<T> = MIN_HEAP_COMPARATOR) {
    this.items = items;
    this.compare = comparator;
  }

  private parent(idx: number): number {
    return Math.ceil(idx / 2) - 1;
  }

  private left(idx: number): number {
    return idx * 2 + 1;
  }

  private right(idx: number): number {
    return idx * 2 + 2;
  }

  private isLeaf(idx: number): boolean {
    const left = this.items[this.left(idx)];
    const right = this.items[this.right(idx)];

    return left === undefined && right === undefined;
  }

  private hasLeftChild(idx: number): boolean {
    return this.left(idx) < this.items.length;
  }

  private hasRightChild(idx: number): boolean {
    return this.right(idx) < this.items.length;
  }

  private hasParent(idx: number): boolean {
    return this.parent(idx) >= 0;
  }

  swap(idx1: number, idx2: number): void {
    [this.items[idx1], this.items[idx2]] = [this.items[idx2], this.items[idx1]];
  }

  peek(): T {
    return this.items[0];
  }

  pop(): T {
    if (this.items.length < 1) throw Error("Heap is empty");

    const top = this.items[0];
    const last = this.items.pop();
    this.items[0] = last;

    this.heapifyDown();
    return top;
  }

  heapifyDown() {
    let currentIdx = 0;

    while (this.hasLeftChild(currentIdx)) {
      const [leftIdx, rightIdx] = [this.left(currentIdx), this.right(currentIdx)];
      let smallerChildIdx = leftIdx;

      if (
        this.hasRightChild(currentIdx) &&
        this.compare(this.items[rightIdx], this.items[leftIdx])
      ) {
        smallerChildIdx = rightIdx;
      }

      if (this.items[currentIdx] < this.items[smallerChildIdx]) break;

      this.swap(currentIdx, smallerChildIdx);
      currentIdx = smallerChildIdx;
    }
  }

  heapifyUp() {
    let currentIdx = this.items.length - 1;
    let parentIdx = this.parent(currentIdx);

    while (
      this.hasParent(parentIdx) &&
      this.compare(this.items[currentIdx], this.items[parentIdx])
    ) {
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = this.parent(currentIdx);
    }
  }

  add(el: T): void {
    this.items.push(el);
    this.heapifyUp();
  }

  buildHeap() {
    for (let i = Math.floor(this.items.length / 2); i >= 0; i--) {
      this.heapifyDown();
    }
  }

  print(): void {
    let i = 0;

    while (!this.isLeaf(i)) {
      console.log("PARENT:", this.items[i]);
      console.log("LEFT CHILD:", this.items[this.left(i)]);
      console.log("RIGHT CHILD:", this.items[this.right(i)]);
      i++;
    }
  }
}
