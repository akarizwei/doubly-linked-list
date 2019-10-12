const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(value) {
        let node = new Node(value);

        if (this.length) {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
            this._head.next = node;
            this._tail.prev = node;
        }

        this.length++;

        return this;
    }

    head() {
        if (this._head) {
            return this._head.data;
        }
    }

    tail() {
        if (this._tail) {
            return this._tail.data;
        }
    }

    at(index) {
        let currentNode = this._head,
            length = this.length;

        if (length == 0 || index < 0 || index > length) {
            return null
        }

        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }

        return currentNode.data;
    }

    insertAt(index, data) {
        let node = new Node(data),
            length = this.length;

        if (index == length) {
            this.append(data);

        } else {
            let currentNode = this._head;

            for (let i = 0; i < index; i++) {
                currentNode = currentNode.next;
            }

            currentNode.prev.next = node;
            node.prev = currentNode.prev;
            node.next = currentNode;
            currentNode.prev = node;
        }
        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        this.length = 0;
        this._head.data = null;
        this._tail.data = null;
        return this;
    }

    deleteAt(index) {
        let currentNode = this._head;

        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }

        currentNode.prev.next = currentNode.next;
        currentNode.next.prev = currentNode.prev;
        currentNode.data = null;
        currentNode.next = null;
        currentNode.prev = null;

        return this;
    }

    reverse() {
        let currentNode = this._head,
            length = this.length;

        for (let i = 0; i < length; i++) {
            let backup = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = backup;
            currentNode = currentNode.prev;
        }

        let backup = this._head;
        this._head = this._tail;
        this._tail = backup;

        return this;
    }

    indexOf(data) {
        let node = this._head;
        for (let i = 0; i < this.length; i++) {
            if (node.data === data) {
                return i;
            }
            node = node.next;
        }
        return -1;
    }
}

module.exports = LinkedList;
