import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { userStore } from '@/store/User';

export class BaseApi {
	async request<T, R = AxiosResponse<T>, D = unknown>(config: AxiosRequestConfig<D>): Promise<R> {
		const requestInstance = axios.create({ baseURL: `${userStore.apiUrl}/waInstance${userStore.idInstance}` });
		return requestInstance(config);
	}
}
