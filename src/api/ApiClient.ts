import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import localToken from './LocalToken';

type Method = 'get' | 'post' | 'put' | 'delete';

type Headers = Record<string, string | boolean> & {
	'Content-Type'?: string;
	access_token?: string;
};

class APIClient {
	private readonly api: AxiosInstance;
	headers: Headers;
	baseURL: string;

	constructor(
		baseURL: string,
		headers: Headers = {},
		config?: AxiosRequestConfig,
	) {
		this.baseURL = baseURL;
		this.headers = headers;
		this.api = axios.create({ baseURL, headers });
	}

	get<T>(endpoint: string): Promise<T> {
		return this.request('get', endpoint);
	}

	post<T>(
		endpoint: string,
		body?: FormData | Record<string, string | boolean | number>,
	): Promise<T> {
		return this.request('post', endpoint, body);
	}

	put<T>(
		endpoint: string,
		body?: FormData | Record<string, string | boolean | number>,
	): Promise<T> {
		return this.request('put', endpoint, body);
	}

	delete<T>(endpoint: string): Promise<T> {
		return this.request('delete', endpoint);
	}

	private request<T>(
		method: Method,
		url: string,
		data: FormData | Record<string, string | boolean | number> = {},
		config?: AxiosRequestConfig,
	): Promise<T> {
		const headers = {
			...this.headers,
			access_token: `${localToken.get()}`,
		};

		if (!(data instanceof FormData)) {
			headers['Content-Type'] = 'application/json';
		}

		return this.api
			.request({
				method,
				url,
				data: method === 'post' || method === 'put' ? data : undefined,
				headers,
				...config,
			})
			.then((res) => res.data)
			.catch((error) => {
				console.error(error);
			});
	}
}

export default APIClient;
