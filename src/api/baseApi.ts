import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { userStore } from '@/store/User';

export class BaseApi {
	controller: AbortController | null = null;

	async request<T, R = AxiosResponse<T>, D = unknown>(
		config: AxiosRequestConfig<D>,
		customCancelEvent?: Event,
	): Promise<R> {
		if (customCancelEvent) {
			this.controller = new AbortController();
			document.addEventListener(
				customCancelEvent.type,
				() => {
					this.controller?.abort();
					this.controller = null;
				},
				{ once: true },
			);
		}

		const requestInstance = axios.create({
			baseURL: `${userStore.apiUrl}/waInstance${userStore.idInstance}`,
			signal: this.controller?.signal,
		});
		return requestInstance(config);
	}
}
