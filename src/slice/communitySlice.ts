import { createSlice } from '@reduxjs/toolkit';
import { Board } from '../types/BoardTypes';

export interface CommunityState {
	category: string;
	place: string;
	reward: number;
	mobile: string;
	kind: string;
	breed: string;
	gender: string;
	color: string;
	lostDate: string;
	lostTime: string;
	title: string;
	text: string;
	images: File[];
	displayLabel?: string;
	subCategory: string;
	isSearch: boolean;
	searchText: string;
	isLoading: boolean;
	boardAll: Board[];
	isModifyPopUp: boolean;
}

const initialState: CommunityState = {
	category: '',
	place: '',
	reward: 0,
	mobile: '',
	kind: '',
	breed: '',
	gender: '',
	color: '',
	lostDate: '',
	lostTime: '',
	title: '',
	text: '',
	images: [],
	displayLabel: '',
	subCategory: '',
	isSearch: false,
	searchText: '',
	isLoading: false,
	boardAll: [],
	isModifyPopUp: false,
};

const communitySlice = createSlice({
	name: 'community',
	initialState,
	reducers: {
		SET_DISPLAY_LABEL(state, action) {
			state.displayLabel = action.payload;
		},
		SET_KIND_PET(state, action) {
			return {
				...state,
				kind: action.payload,
			};
		},
		SET_CATEGORY(state, action) {
			return {
				...state,
				category: action.payload,
			};
		},
		SET_GENDER(state, action) {
			return {
				...state,
				gender: action.payload,
			};
		},
		SET_INPUT_VALUE(state, action) {
			return {
				...state,
				place: action.payload.place,
				lostDate: action.payload.lost_date,
				lostTime: action.payload.lost_time,
				breed: action.payload.breed,
				color: action.payload.color,
				mobile: action.payload.mobile,
				reward: action.payload.reward,
				text: action.payload.text,
				title: action.payload.title,
			};
		},
		SET_IMAGES(state, action) {
			state.images = action.payload;
		},
		SET_SUB_CATEGORY(state, action) {
			state.subCategory = action.payload;
		},
		SET_GET_ALL_BOARD(state, action) {
			state.boardAll = action.payload;
		},
		SET_MODIFY_VALUE(state, action) {
			return {
				...state,
				kind: action.payload?.kind,
				text: action.payload?.text,
			};
		},
		SET_MODIFY_POPUP(state, action) {
			state.isModifyPopUp = action.payload;
		},
		SET_SEARCH_TEXT(state, action) {
			state.searchText = action.payload;
		},
		SET_IS_SEARCH(state, action) {
			state.isSearch = action.payload;
		},
		SET_IS_LOADING(state, action) {
			state.isLoading = action.payload;
		},
	},
});

export const {
	SET_DISPLAY_LABEL,
	SET_KIND_PET,
	SET_CATEGORY,
	SET_GENDER,
	SET_INPUT_VALUE,
	SET_IMAGES,
	SET_SUB_CATEGORY,
	SET_GET_ALL_BOARD,
	SET_MODIFY_VALUE,
	SET_MODIFY_POPUP,
	SET_SEARCH_TEXT,
	SET_IS_SEARCH,
	SET_IS_LOADING,
} = communitySlice.actions;

export default communitySlice.reducer;
