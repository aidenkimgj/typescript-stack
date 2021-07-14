type Data = {
  value: string;
};

interface Stack {
  getSize(): number;
  push(toPush: Data): void;
  pop(): Data;
  isEmpty(): boolean;
}

interface List {
  getSize(): number;
  add(toAdd: Data): boolean;
  remove(index: number): Data;
  retrieve(index: number): Data;
  isEmpty(): boolean;
}

class MyNode {
  private next: MyNode | null;
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
  private head?: MyNode;
  private size: number = 0;

  getSize(): number {
    return this.size;
  }
  retrieve(index: number): Data {
    if (index >= this.size) {
      throw new Error('Index is out of bounds');
    }
    let tempNode: MyNode = this.head;

    for (let i: number = 0; i < index; i++) {
      tempNode = tempNode.nextNode;
    }
    return tempNode.nodeData;
  }

  add(toAdd: Data): boolean {
    try {
      const newNode = new MyNode(toAdd);

      if (this.isEmpty()) {
        newNode.nextNode = this.head;
        this.head = newNode;
      } else {
        let lastNode: MyNode = this.head;
        for (let i: number = 0; i < this.size - 1; i++) {
          lastNode = lastNode.nextNode;
        }

        lastNode.nextNode = newNode;
      }
      this.size++;
      return true;
    } catch (e) {
      return false;
    }
  }
  remove(index: number): Data {
    if (index >= this.size || index < 0) {
      throw new Error('Index is out of bounds');
    }

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
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
}

class MyStack implements Stack {
  constructor(private myList: List) {}
  getSize(): number {
    return this.myList.getSize();
  }
  push(toPush: Data): void {
    this.myList.add(toPush);
  }
  pop(): Data {
    return this.myList.remove(this.myList.getSize() - 1);
  }
  isEmpty(): boolean {
    return this.myList.isEmpty();
  }
}

const list = new MyList();
const stack = new MyStack(list);

console.log('list size', list.getSize());
console.log('stack size', stack.getSize());

stack.push({ value: 'Aiden' });

console.log('get data', list.retrieve(0));
console.log('list size', list.getSize());
console.log('stack size', stack.getSize());

stack.push({ value: 'Jamie' });
console.log('get data', list.retrieve(1));
stack.push({ value: '' });
console.log('get data', list.retrieve(2));

console.log('list size', list.getSize());
console.log('stack size', stack.getSize());

const ex = stack.pop();
console.log('pop data', ex);

console.log('list size', list.getSize());
console.log('stack size', stack.getSize());
