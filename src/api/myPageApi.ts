import APIClient from './ApiClient';

const MY_PAGE = '/get';
const CHANGE_IMG = '/modifyProfile';
const CHANGE_INFO = '/modifyInfo';
const CHANGE_NICKNAME = '/modifyNickname';
const CHANGE_PASSWORD = '/modifyPassword';
const CHANGE_MOBILE = '/modifyMobile';
const CHANGE_ADDRESS = '/modifyCityTown';
const BASE_URL = 'http://3.35.16.126:8080';

export const authApi = new APIClient(BASE_URL + '/api/myPage');

interface ChangeAddressRequestBody {
	city: string;
	town: string;
}

export const myPageGet = async (): Promise<any> => {
	return await authApi.get(MY_PAGE, {
		email: '',
		name: '',
		nickname: '',
		mobile: '',
		city: '',
		info: '',
		img: '',
		gender: '',
		town: '',
		experience: '',
	});
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
