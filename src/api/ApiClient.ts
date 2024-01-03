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

	get<T, U>(endpoint: string, body?: FormData | Record<string, U>): Promise<T> {
		return this.request('get', endpoint, body);
	}

	post<T, U>(
		endpoint: string,
		body?: FormData | Record<string, U>,
	): Promise<T> {
		return this.request('post', endpoint, body);
	}

	put<T, U>(endpoint: string, body?: FormData | Record<string, U>): Promise<T> {
		return this.request('put', endpoint, body);
	}

	delete<T, U>(
		endpoint: string,
		body?: FormData | Record<string, U>,
	): Promise<T> {
		return this.request('delete', endpoint, body);
	}

	private async refreshAccessToken(): Promise<string | undefined> {
		const refreshToken = localToken.get(true);
		if (!refreshToken) {
			console.error('No refresh token available');
			return undefined;
		}

		try {
			const response = await axios.post(`${this.baseURL}/api/refresh`, {
				refreshToken,
			});
			const { accessToken } = response.data;
			localToken.save(accessToken);
			return accessToken;
		} catch (error) {
			console.error('Error refreshing access token:', error);
			return undefined;
		}
	}

	private async request<T, U>(
		method: Method,
		url: string,
		data: FormData | Record<string, U> = {},
		config?: AxiosRequestConfig,
	): Promise<T> {
		let accessToken = localToken.get();

		if (localToken.isTokenExpired()) {
			accessToken = (await this.refreshAccessToken()) || null;
		}

		const headers = {
			...this.headers,
			access_token: `${accessToken}`,
		};

		if (!(data instanceof FormData)) {
			headers['Content-Type'] = 'application/json';
		}

		return this.api
			.request({
				method,
				url,
				data:
					method === 'post' || method === 'put' || method === 'delete'
						? data
						: undefined,
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
