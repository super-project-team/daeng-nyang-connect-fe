import APIClient from './ApiClient';

const MY_PAGE = '/get';
const CHANGE_IMG = '/modifyProfile';
const CHANGE_INFO = '/modifyInfo';
const CHANGE_NICKNAME = '/modifyNickname';
const CHANGE_PASSWORD = '/modifyPassword';
const CHANGE_MOBILE = '/modifyMobile';
const CHANGE_ADDRESS = '/modifyCityTown';
const GET_MY_BOARD = '/getMyBoard';
const GET_MY_LIKED = '/getMyLikeBoard';
const BASE_URL = 'https://daeng-nyang-be-qyu5xzcspa-du.a.run.app';

export const authApi = new APIClient(BASE_URL + '/api/myPage');

interface ChangeAddressRequestBody {
	city: string;
	town: string;
}

export const myPageGet = async (): Promise<any> => {
	return await authApi.get(MY_PAGE);
};

export const changeImg = async (body: File): Promise<any> => {
	const formData = new FormData();
	formData.append('multipartFile', body);

	return await authApi.put(CHANGE_IMG, formData);
};

export const changeInfo = async (body: string): Promise<any> => {
	return await authApi.put(CHANGE_INFO + `?info=${body}`);
};

export const changeNickname = async (body: string): Promise<any> => {
	return await authApi.put(CHANGE_NICKNAME + `?nickname=${body}`);
};

export const changePassword = async (body: string): Promise<any> => {
	return await authApi.put(CHANGE_PASSWORD + `?password=${body}`);
};

export const changeMobile = async (body: string): Promise<any> => {
	return await authApi.put(CHANGE_MOBILE + `?mobile=${body}`);
};

export const changeAddress = async (
	body: ChangeAddressRequestBody,
): Promise<any> => {
	return await authApi.put(
		CHANGE_ADDRESS + `?city=${body.city}&town=${body.town}`,
	);
};

export const getMyBoard = async (): Promise<any> => {
	return await authApi.get(GET_MY_BOARD);
};

export const getMyLiked = async (): Promise<any> => {
	return await authApi.get(GET_MY_LIKED);
};

const GET_LIKE = '/getMyLikeBoard';

export const myPageApi = new APIClient(BASE_URL + '/api/myPage');

export const getUserLikes = async (): Promise<any> => {
	return await myPageApi.get(GET_LIKE);
};
