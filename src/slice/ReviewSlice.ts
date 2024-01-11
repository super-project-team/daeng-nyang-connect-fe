import { createSlice } from '@reduxjs/toolkit';

export interface ReviewItem {
	isLiked: boolean;
	likes: number;
	comments: Comment[];
	adoptedAnimalName: string;
	age: string;
	boardId: number;
	createdAt: string;
	images: string[];
	nickname: string;
	textReview: string;
	userThumbnail: string;
}

interface Comment {
	id: number;
	text: string;
}

const initialState: ReviewItem[] = [];

const reviewSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		PUSH_REVIEW_ITEM(state, action) {
			state.push(action.payload);
		},
		DELETE_REVIEW_ITEM(state, action) {
			state.splice(action.payload, 1);
		},
		MODIFY_REVIEW_ITEM(state, action) {
			const { index, modifiedReview } = action.payload;
			state[index] = modifiedReview;
		},
		TOGGLE_LIKE(state, action) {
			const index = action.payload;
			const review = state[index];
			review.isLiked = !review.isLiked;
			review.likes += review.isLiked ? 1 : -1;
		},
		POST_COMMENT(state, action) {
			const { index, commentText } = action.payload;
			const review = state[index];
			const newComment: Comment = {
				id: review.comments.length + 1,
				text: commentText,
			};
			review.comments.push(newComment);
		},
		DELETE_COMMENT(state, action) {
			const { reviewIndex, commentId } = action.payload;
			const review = state[reviewIndex];
			review.comments = review.comments.filter(
				(comment) => comment.id !== commentId,
			);
		},
	},
});

export const {
	PUSH_REVIEW_ITEM,
	DELETE_REVIEW_ITEM,
	MODIFY_REVIEW_ITEM,
	TOGGLE_LIKE,
	POST_COMMENT,
	DELETE_COMMENT,
} = reviewSlice.actions;
export default reviewSlice.reducer;
