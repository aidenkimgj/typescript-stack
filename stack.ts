type Data = {
  value: string;
};

interface Stack {
  getSize(): number;
  push(value: string): void;
  pop(): string;
  isEmpty(): boolean;
}

interface List {
  getSize(): number;
  add(toAdd: Data): boolean;
  remove(index: number): Data;
  isEmpty(): boolean;
}

class MyNode {
  private next: MyNode;
  constructor(private data: Data) {}

  get nodeData(): Data {
    return this.data;
  }

  set nodeData(data: Data) {
    this.data = data;
  }

  get nextNode(): MyNode {
    return this.next;
  }

  set nextNode(next: MyNode) {
    this.next = next;
  }
}

class MyList implements List {
  private head: MyNode = null;
  private size: number = 0;

  getSize(): number {
    return this.size;
  }
  add(toAdd: Data): boolean {
    try {
      const newNode = new MyNode(toAdd);

      if (this.isEmpty()) {
        newNode.nextNode = this.head;
        this.head = newNode;
        console.log('data', newNode.nodeData);
      } else {
        console.log('hello');
        let lastNode: MyNode = this.head;
        for (let i: number = 0; i < this.size - 1; i++) {
          lastNode = lastNode.nextNode;
        }
        console.log('읽어?');
        console.log('yes', newNode.nodeData);
        lastNode.nextNode = newNode;
        console.log('data2', lastNode.nextNode.nodeData);
      }
      this.size++;
      return true;
    } catch (e) {
      return false;
    }
  }
  remove(index: number): Data {
    try {
      if (index === 0) {
        const tempNode: MyNode = this.head;
        this.head = tempNode.nextNode;
        tempNode.nextNode = null;
        this.size--;
        return tempNode.nodeData;
      } else {
        let preNode = this.head;
        let targetNode = preNode.nextNode;
        for (let i: number = 0; i < index - 1; i++) {
          preNode = preNode.nextNode;
          targetNode = preNode.nextNode;
        }
        preNode.nextNode = targetNode.nextNode;
        targetNode.nextNode = null;
        this.size--;
        return targetNode.nodeData;
      }
    } catch (e) {}
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
}

const list = new MyList();

console.log(list.getSize());
list.add({ value: 'hello' });
console.log(list.getSize());
list.add({ value: 'world' });
console.log(list.getSize());
console.log(list.remove(0));
console.log(list.getSize());
