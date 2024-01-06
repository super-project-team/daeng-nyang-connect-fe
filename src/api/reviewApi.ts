import APIClient from './ApiClient';

const MODIFY = '/review/modify';
const LIKE = '/review/like';
const POST = '/review/post';
const GET_ALL = '/review/getAll';
const DELETE = '/review/delete';
const COMMENT = '/review/comments/post';
const COMMENT_DELETE = '/review/comments/delete';
const BASE_URL = 'http://localhost:8080';

interface ReviewComment {
	comment: string;
}
interface ReviewRequest {
	textReview: string;
	files: File[];
}
interface ReviewModify {
	textReview: string;
}
export interface ReviewData {
	boardId: number;
	animalId: number;
	adoptedAnimalName: string;
	images: string[];
	textReview: string;
	age: number;
	nickname: string;
	userThumbnail: string;
}

interface Comments {
	commentsId: number;
	nickname: string;
	adoptedAnimalName: string;
	textReivew: string;
	comment: string;
	createdAt: string;
	userThumbnail: string;
}

export const reviewApi = new APIClient(BASE_URL + '/api');

export const getReviews = async (): Promise<ReviewData[]> => {
	return await reviewApi.get(GET_ALL);
};

export const reviewPost = async (body: ReviewRequest, animalId: number) => {
	const formData = new FormData();

	formData.append('textReview', body.textReview);

	if (body.files) {
		body.files.forEach((file) => {
			formData.append(`files`, file);
		});
	}
	return await reviewApi.post(POST + `?animalId=${animalId}`, formData);
};

export const getDetailReview = async (
	animalId: number,
): Promise<ReviewData[]> => {
	return await reviewApi.get(`/review?animalId=${animalId}`);
};

export const deleteReview = async (reviewId: number | null) => {
	return await reviewApi.delete(`review/delete?reviewId=${reviewId}`);
};

export const modifyReview = async (reviewId: number, body: ReviewModify) => {
	return await reviewApi.put(`review/modify?reviewId=${reviewId}`, {
		textReview: body.textReview,
	});
};

export const likeReview = async (reviewId: number) => {
	return await reviewApi.post(`review/like?reviewId=${reviewId}`);
};

export const getAllComments = async (reviewId: number): Promise<Comments[]> => {
	return await reviewApi.get(`/review/comments?reviewId=${reviewId}`);
};

export const postComment = async (
	reviewId: number,
	body: ReviewComment,
): Promise<any> => {
	return await reviewApi.post(COMMENT + `?reviewId=${reviewId}`, {
		comment: body.comment,
	});
};

export const modifyComment = async (reviewId: number, body: ReviewComment) => {
	return await reviewApi.put(
		`/review/comments/modify?reviewCommentsId=${reviewId}`,
		{
			comment: body.comment,
		},
	);
};

export const deleteComment = async (reviewCommentsId: number) => {
	return await reviewApi.delete(
		COMMENT_DELETE + `?reviewCommentsId=${reviewCommentsId}`,
	);
};
