import { makeAutoObservable } from 'mobx';

export type IChatItem = string;

class Chat {
	items: IChatItem[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	get isEmpty() {
		return this.items.length === 0;
	}

	add(item: IChatItem) {
		this.items.push(item);
	}

	delete(item: IChatItem) {
		this.items = this.items.filter((it) => it !== item);
	}
}

export const chatStore = new Chat();
