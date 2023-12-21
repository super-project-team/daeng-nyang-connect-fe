import { createSlice } from '@reduxjs/toolkit';

interface UserState {
	isLoggedIn: boolean;
	nickname: string;
	id: string;
}

export interface RootUserState {
	user: UserState;
}

const initialState: UserState = {
	isLoggedIn: false,
	nickname: '',
	id: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		LOGIN_USER(state, action) {
			const { isLoggedIn, nickname, id } = action.payload;
			state.isLoggedIn = isLoggedIn;
			state.nickname = nickname;
			state.id = id;
		},
		LOGOUT_USER(state) {
			state.isLoggedIn = false;
			state.nickname = '';
			state.id = '';
		},
	},
});

export const { LOGIN_USER, LOGOUT_USER } = userSlice.actions;

export default userSlice.reducer;
