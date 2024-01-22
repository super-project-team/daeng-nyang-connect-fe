import APIClient from './ApiClient';

const GET = '/notifications';
const DELETE = '/notifications/delete';
const BASE_URL = 'https://daeng-nyang-be-qyu5xzcspa-du.a.run.app';

export const NotificationApi = new APIClient(BASE_URL + '/api');

export const NotifyLike = async () => {
	return await NotificationApi.get(GET);
};
