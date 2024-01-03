import { Board, BoardDetail, BoardSize, PostBoard } from '../types/BoardTypes';
import APIClient from './ApiClient';

const ALL = 'getAll';
const SIZE = 'getSize';
const POST = 'post';
const MODIFY = 'modify';
const DELETE = 'delete';
const BASE_URL = 'http://52.79.108.20:8080';

export const communityApi = new APIClient(BASE_URL + '/api');

export const getAllBoard = async (
	communityType: string | undefined,
	pages?: string,
): Promise<Board[]> => {
	return await communityApi.get(
		`${communityType}/${ALL}${
			communityType === 'tips' || communityType === 'mate'
				? `?page=${pages}`
				: ''
		}`,
	);
};

export const getSize = async (
	communityType: string | undefined,
): Promise<BoardSize> => {
	return await communityApi.get(`${communityType}/${SIZE}`);
};

export const getBoard = async (
	communityType: string | undefined,
	id: string | undefined,
): Promise<BoardDetail> => {
	return await communityApi.get(`${communityType}/getBoard?id=${id}`);
};

export const searchBoard = async (
	communityType: string | undefined,
	keyword: string,
) => {
	return await communityApi.get(`${communityType}/search?keyword=${keyword}`);
};

export const postBoard = async (
	communityType: string | undefined,
	body: PostBoard,
) => {
	const formData = new FormData();
	console.log('body', body);
	const { images } = body;

	Object.keys(body).forEach((key) => {
		if (key !== 'images') {
			const value = body[key as keyof PostBoard];
			if (value !== undefined && value !== null) {
				formData.append(key, value.toString());
			}
		}
	});

	if (images) {
		images.forEach((image) => {
			formData.append('files', image, image.name);
		});
	} else if (images === null) {
		formData.append('files', '');
	}

	return await communityApi.post(`${communityType}/${POST}`, formData);
};

export const modifyBoard = async (
	communityType: string | undefined,
	communityIdType: string | undefined,
	id: number | undefined,
	body: PostBoard,
) => {
	const formData = new FormData();

	Object.keys(body).forEach((key) => {
		if (key !== 'images') {
			const value = body[key as keyof PostBoard];
			if (value !== undefined) {
				formData.append(key, value.toString());
			}
		}
	});

	return await communityApi.put<PostBoard>(
		`${communityType}/${MODIFY}?${communityIdType}=${id}`,
		formData,
	);
};

export const deleteBoard = async (
	communityType: string | undefined,
	communityIdType: string | undefined,
	id: string | undefined,
) => {
	return await communityApi.delete(
		`${communityType}/${DELETE}?${communityIdType}=${id}`,
	);
};

export const likeBoard = async (
	communityType: string | undefined,
	communityIdType: string | undefined,
	id: string | undefined,
) => {
	return await communityApi.post(
		`${communityType}/like?${communityIdType}=${id}`,
	);
};

export const postComment = async (
	communityType: string | undefined,
	id: string | undefined,
	comment: string,
) => {
	return await communityApi.post(`${communityType}/comments/${POST}?id=${id}`, {
		comment,
	});
};

export const modifyComment = async (
	communityType: string | undefined,
	id: number,
	comment: string,
) => {
	return await communityApi.put(
		`${communityType}/comments/${MODIFY}?id=${id}`,
		{
			comment,
		},
	);
};

export const deleteComment = async (
	communityType: string | undefined,
	id: number,
) => {
	return await communityApi.delete(
		`${communityType}/comments/${DELETE}?id=${id}`,
	);
};

export const likeComment = async (communityType: string, id: number) => {
	return await communityApi.post(`${communityType}/comments/like?id=${id}`);
};
