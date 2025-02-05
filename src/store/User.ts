import { makeAutoObservable } from 'mobx';

class User {
	apiUrl: string | null = null;
	idInstance: string | null = null;
	apiTokenInstance: string | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	setFields(apiUrl: string, idInstance: string, apiTokenInstance: string) {
		this.apiUrl = apiUrl;
		this.idInstance = idInstance;
		this.apiTokenInstance = apiTokenInstance;
	}

	get isValid() {
		return !!(this.apiUrl && this.idInstance && this.apiTokenInstance);
	}
}

export const userStore = new User();
