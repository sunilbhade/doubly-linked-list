const Node = require('./node');

class LinkedList {
	constructor() {
		this._tail = new Node();
		this._head = new Node();
		Object.defineProperty(this, 'length', {
			get: function () {
				var count = -1;
				if (this._head.next === null
					&& this._tail.prev === null) {
					count = 0;
				} else {
					var nextNode = this._head.next;
					while (nextNode !== null) {
						count++;
						nextNode = nextNode.next;
					}
				}
				return count;
			}
		})
	}

	append(data) {
		var newNode = new Node(data);
		if (this._head.next == null && this._tail.prev == null) {
			this._head.next = newNode;
			this._tail.prev = newNode;
			newNode.prev = this._head;
			newNode.next = this._tail;
		} else if (this._tail.prev !== null) {
			var prevNode = this._tail.prev;
			this._tail.prev = newNode;
			newNode.next = this._tail;
			newNode.prev = prevNode;
			prevNode.next = newNode;
		}
		return this;
	}

	head() {
		if (this._head.next !== null) {
			return this._head.next.data;
		}
		return null;
	}

	tail() {
		if (this._tail.prev !== null) {
			return this._tail.prev.data;
		}
		return null;
	}

	at(index) {
		return this.getNodeAt(index).data;
	}

	insertAt(index, data) {
		if (index < 0 || index > this.length) {
			return this;
		}
		var newNode = new Node(data);
		if (this._head.next == null && this._tail.prev == null) {
			this._head.next = newNode;
			this._tail.prev = newNode;
			newNode.prev = this._head;
			newNode.next = this._tail;
		} else {
			var item = this.getNodeAt(index);
			if (item !== null && item.prev !== null && item.next !== null) {
				newNode.next = item;
				newNode.prev = item.prev;
				item.prev.next = newNode;
				item.prev = newNode;
			}
		}
		return this;
	}

	isEmpty() { return this.length <= 0; }

	clear() {
		this._head.next = null;
		this._head.prev = null;
		this._tail.next = null;
		this._tail.prev = null;
		return this;
	}

	deleteAt(index) {
		if (index < 0 || index > this.length) {
			return this;
		}
		var item = this.getNodeAt(index);
		if (item !== null) {

			if (item.prev !== null && item.next !== null) {
				item.prev.next = item.next;
				item.next.prev = item.prev;
				item.prev = null;
				item.next = null;
				item = null;
			}
		}
		return this;
	}

	reverse() {
		var list = new LinkedList();
		for (var index = 0; index < this.length; index++) {
			var item = this.getNodeAt(index);
			list.insertAt(0, item.data);
		}
		this._head = list._head;
		this._tail = list._tail;
		return this;
	}

	indexOf(data) {
		var index = -1;
		var nextNode = this._head.next;
		if (nextNode === null) {
			return index;
		}
		var nodeIndex = -1;
		while (nextNode !== null &&
            nextNode.data !== null) {
			index++;
			if (data === nextNode.data) {
				nodeIndex = index;
				break;
			}
			nextNode = nextNode.next;
		}
		return nodeIndex;
	}

	getNodeAt(index) {
		var node = null;
		if (this._head.next === null || index < 0) {
			return node;
		}

		var count = -1;
		var nextNode = this._head.next;

		while (nextNode !== null) {
			count++;
			if (count === index) {
				node = nextNode;
				break;
			}
			nextNode = nextNode.next;
		}
		return node;
	}
}

module.exports = LinkedList;
