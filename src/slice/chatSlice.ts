import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	chatAnimal: {},
	chatAnimalId: 0,
	chatCounterUser: {},
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		GET_ANIMAL_ID(state, action) {
			state.chatAnimalId = action.payload;
		},
		CHAT_ANIMAL(state, action) {
			const newAnimal = action.payload;
			state.chatAnimal = {
				chatRoomId: newAnimal.chatRoomId,
				animalName: newAnimal.animalName,
				animalImage: newAnimal.animalImage,
				animalAge: newAnimal.animalAge,
				breed: newAnimal.breed,
			};
		},
		ADD_CHAT_COUNTER_USER(state, action) {
			state.chatCounterUser = action.payload;
		},
	},
});

export const { CHAT_ANIMAL, GET_ANIMAL_ID, ADD_CHAT_COUNTER_USER } =
	chatSlice.actions;

export default chatSlice.reducer;
