import APIClient from './ApiClient';

const MODIFY = '/modify';
const LIKE = '/like';
const POST = '/post';
const GET_ALL = '/getAll';
const DELETE = '/delete';
const COMMENT = '/comments/post';
const COMMENT_DELETE = 'comments/delete';
const BASE_URL = 'http://3.35.16.126:8080';

interface ReviewRequest {
	textReview: string;
	files: File[];
}
interface ReviewData {
	boardId: number;
	adoptedAnimalName: string;
	images: string[];
	textReview: string;
	age: number;
}

export const reviewApi = new APIClient(BASE_URL + '/api/review');

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

export const deleteReview = async (reviewId: number) => {
	return await reviewApi.delete(DELETE + `/${reviewId}`);
};

export const modifyReview = async (reviewId: number) => {
	return await reviewApi.put(MODIFY + `/${reviewId}`, {});
};

export const likeReview = async (reviewId: number) => {
	return await reviewApi.post(LIKE + `/${reviewId}`, {});
};

export const postComment = async (reviewId: number) => {
	return await reviewApi.post(COMMENT + `/${reviewId}`, {});
};

export const deleteComment = async (reviewCommentsId: number) => {
	return await reviewApi.delete(COMMENT_DELETE + `${reviewCommentsId}`);
};
