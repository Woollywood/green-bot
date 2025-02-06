import { makeAutoObservable } from 'mobx';

const LOCAL_STORAGE_KEY = 'userStore';

class User {
	apiUrl: string | null = null;
	idInstance: string | null = null;
	apiTokenInstance: string | null = null;

	constructor() {
		const storedValues = this.getValuesFromLocalStorage();
		if (storedValues) {
			this.setFields(storedValues);
		}

		makeAutoObservable(this);
	}

	getValuesFromLocalStorage() {
		const storedValues = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storedValues) {
			return JSON.parse(storedValues) as {
				apiUrl: string;
				idInstance: string;
				apiTokenInstance: string;
			};
		}
	}

	setFields({
		apiUrl,
		idInstance,
		apiTokenInstance,
	}: {
		apiUrl: string;
		idInstance: string;
		apiTokenInstance: string;
	}) {
		this.apiUrl = apiUrl;
		this.idInstance = idInstance;
		this.apiTokenInstance = apiTokenInstance;

		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ apiUrl, idInstance, apiTokenInstance }));
	}

	resetFields() {
		this.apiUrl = null;
		this.idInstance = null;
		this.apiTokenInstance = null;

		localStorage.removeItem(LOCAL_STORAGE_KEY);
	}

	get isValid() {
		return !!(this.apiUrl && this.idInstance && this.apiTokenInstance);
	}
}

export const userStore = new User();
