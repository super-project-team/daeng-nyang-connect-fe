import APIClient from './ApiClient';

const NOTIFY = '/notifications';
const BASE_URL = 'http://52.79.108.20:8080';

export const BaseApi = new APIClient(BASE_URL + '/api');

export const NotifyLike = async () => {
	return await BaseApi.get(NOTIFY);
};
