import APIClient from './ApiClient';

const GET_LIKE = '/getMyLikeBoard';
const BASE_URL = 'http://3.35.16.126:8080';

export const myPageApi = new APIClient(BASE_URL + '/api/myPage');

export const getUserLikes = async (): Promise<any> => {
	return await myPageApi.get(GET_LIKE);
};
