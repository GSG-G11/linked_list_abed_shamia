function Node(val) {
  this.val = val;
  this.next = null;
  this.prev = null;
}

function DoublyLinkedList(array = []) {
  this.head = null;
  this.tail = null;
  this.length = 0;

  if (Array.isArray(array)) {
    array.forEach(el => {
      this.push(el);
    });
  }
}

DoublyLinkedList.prototype.push = function (val) {
  let newNode = new Node(val);

  if (this.head === null) {
    this.head = newNode;
    this.tail = this.head;
  } else {
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }

  this.length++;
  return this;
};

DoublyLinkedList.prototype.unshift = function (val) {
  let newNode = new Node(val);

  if (this.head === null) {
    this.head = newNode;
    this.tail = this.head;
  } else {
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }

  this.length++;
  return this;
};

DoublyLinkedList.prototype.insert = function (index, val) {
  const newNode = new Node(val);
  if (index < 0 || index > this.length) return;

  if (index === 0) {
    this.unshift(val);
  }

  if (index === this.length) {
    this.push(val);
  }

  let currentNode = this.head;
  let count = 0;
  while (currentNode) {
    if (count === index - 1) {
      newNode.next = currentNode.next;
      currentNode.next.prev = newNode;
      currentNode.next = newNode;
      newNode.prev = currentNode;
      this.length++;
      return this;
    }
    currentNode = currentNode.next;
    count++;
  }

  return this;
};

DoublyLinkedList.prototype.getNode = function (index) {
  if (index < 0 || index > this.length) return;

  let currentNode = this.head;
  let count = 0;
  while (currentNode) {
    if (count === index) {
      return currentNode;
    }
    currentNode = currentNode.next;
    count++;
  }
};

DoublyLinkedList.prototype.get = function (index) {
  if (index < 0 || index > this.length) return;

  let currentNode = this.head;
  let count = 0;
  while (currentNode) {
    if (count === index) {
      return currentNode.val;
    }
    currentNode = currentNode.next;
    count++;
  }
};

DoublyLinkedList.prototype.set = function (index, val) {
  if (index < 0 || index > this.length) return;

  let currentNode = this.head;
  let count = 0;
  while (currentNode) {
    if (count === index) {
      currentNode.val = val;
      return this;
    }
    currentNode = currentNode.next;
    count++;
  }
};

DoublyLinkedList.prototype.pop = function () {
  if (this.length === 0) return;

  if (this.length === 1) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    return;
  }

  let currentNode = this.head;
  while (currentNode.next) {
    currentNode = currentNode.next;
  }

  this.tail = currentNode;
  this.tail.next = null;
  this.length--;

  return currentNode.val;
};

DoublyLinkedList.prototype.shift = function () {
  if (this.length === 0) return;

  if (this.length === 1) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    return;
  }

  let temp = this.head;
  this.head = this.head.next;
  this.head.prev = null;
  this.length--;
  return temp.val;
};

DoublyLinkedList.prototype.remove = function (index) {
  if (index < 0 || index > this.length) return;

  if (index === 0) {
    this.shift();
  }

  if (index === this.length - 1) {
    this.pop();
  }

  let currentNode = this.head;
  let count = 0;
  while (currentNode) {
    if (count === index - 1) {
      currentNode.next = currentNode.next.next;
      currentNode.next.prev = currentNode;
      this.length--;
      return this;
    }
    currentNode = currentNode.next;
    count++;
  }
};

DoublyLinkedList.prototype.reverse = function () {
  let currentNode = this.head;
  let prevNode = null;
  let nextNode = null;

  while (currentNode) {
    nextNode = currentNode.next;
    currentNode.next = prevNode;
    currentNode.prev = nextNode;
    prevNode = currentNode;
    currentNode = nextNode;
  }

  this.head = prevNode;
  this.tail = currentNode;
};
