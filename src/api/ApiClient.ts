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
		this.api = axios.create({ baseURL, headers, withCredentials: true });
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
			console.log('refreshToken', refreshToken);
			const response = await axios.post(
				`http://52.79.108.20:8080/api/refresh`,
				{
					refreshToken,
				},
				{
					headers: {
						refresh_token: refreshToken,
					},
					withCredentials: true,
				},
			);

			const { access_token } = response.data;

			localToken.save(access_token);
			return access_token;
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
