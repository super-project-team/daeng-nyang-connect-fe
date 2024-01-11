import APIClient from './ApiClient';

const SIGNUP = '/signup';
const LOGIN = '/login';
const LOGOUT = '/logout';
const ID_CHECK = '/IdCheck';
const NICKNAME_CHECK = '/NicknameCheck';
const FIND_ID = '/findId';
const FIND_PASSWORD = '/findPassword';
const KAKAO_REGISTER = '/addKakaoInfo';
const NAVER_REGISTER = '/addNaverInfo';
const DELETE_USER = '/deleteUser';

const BASE_URL = 'http://52.79.108.20:8080';

export const oauthApi = new APIClient(BASE_URL + '/oauth');

export const oauthLoginCheck = async (token: string): Promise<any> => {
	return await oauthApi.post('/login');
};

export const authApi = new APIClient(BASE_URL + '/api');
interface SignupRequestBody {
	email: string;
	password: string;
	name: string;
	nickname: string;
	mobile: string;
	city: string;
	town: string;
	experience: boolean;
	gender: string;
}

interface LoginRequestBody {
	email: string;
	password: string;
}

interface IdCheckRequestBody {
	email: string;
}

interface NicknameCheckRequestBody {
	nickname: string;
}

interface FindIdRequestBody {
	name: string;
	mobile: string;
}

interface FindPasswordRequestBody {
	name: string;
	mobile: string;
	email: string;
	newPassword: string;
}

interface KakaoRegisterRequestBody {
	nickname: string;
	city: string;
	town: string;
	experience: boolean;
	gender: string;
}

interface NaverRegisterRequestBody {
	city: string;
	town: string;
	experience: boolean;
	gender: string;
	nickname: string;
}

interface DeleteUserRequestBody {
	email: string;
	password: string;
}

export const signupUser = async (body: SignupRequestBody): Promise<any> => {
	return await authApi.post(SIGNUP, {
		email: body.email,
		password: body.password,
		name: body.name,
		nickname: body.nickname,
		mobile: body.mobile,
		city: body.city,
		town: body.town,
		experience: body.experience,
		gender: body.gender,
	});
};

export const loginUser = async (body: LoginRequestBody): Promise<any> => {
	return await authApi.post(LOGIN, {
		email: body.email,
		password: body.password,
	});
};

export const logoutUser = async () => {
	return await authApi.post(LOGOUT, {});
};

export const idCheck = async (body: IdCheckRequestBody): Promise<any> => {
	return await authApi.get(ID_CHECK + `?Id=${body.email}`);
};

export const nicknameCheck = async (
	body: NicknameCheckRequestBody,
): Promise<any> => {
	return await authApi.get(NICKNAME_CHECK + `?nickname=${body.nickname}`);
};

export const findId = async (body: FindIdRequestBody): Promise<any> => {
	return await authApi.get(
		FIND_ID + `?name=${body.name}&mobile=${body.mobile}`,
	);
};

export const findPassword = async (
	body: FindPasswordRequestBody,
): Promise<any> => {
	return await authApi.post(FIND_PASSWORD, {
		name: body.name,
		mobile: body.mobile,
		email: body.email,
		newPassword: body.newPassword,
	});
};

export const kakaoRegister = async (
	body: KakaoRegisterRequestBody,
): Promise<any> => {
	return await authApi.put(KAKAO_REGISTER, {
		nickname: body.nickname,
		city: body.city,
		town: body.town,
		experience: body.experience,
		gender: body.gender,
	});
};

export const naverRegister = async (
	body: NaverRegisterRequestBody,
): Promise<any> => {
	return await authApi.put(NAVER_REGISTER, {
		nickname: body.nickname,
		city: body.city,
		town: body.town,
		experience: body.experience,
		gender: body.gender,
	});
};

export const deleteUser = async (body: DeleteUserRequestBody): Promise<any> => {
	return await authApi.delete(DELETE_USER, {
		email: body.email,
		password: body.password,
	});
};
