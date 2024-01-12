import APIClient from './ApiClient';

const GET = '/notifications';
const DELETE = '/notifications/delete';
const BASE_URL = 'http://52.79.108.20:8080';

export const NotificationApi = new APIClient(BASE_URL + '/api');

export const NotifyLike = async () => {
	return await NotificationApi.get(GET);
};
