import { createSlice } from '@reduxjs/toolkit';

interface ChatAnimalInfo {
	animalId: number;
	animalName: string;
	animalAge: string;
	breed: string;
	animalImage: string;
}
interface ChatRoom {
	roomId: number;
}

export interface ChatState {
	chatAnimals: ChatAnimalInfo;
	chatRoom: ChatRoom;
}

const initialState: ChatState = {
	chatAnimals: {
		animalId: 0,
		animalAge: '',
		animalImage: '',
		animalName: '',
		breed: '',
	},
	chatRoom: {
		roomId: 0,
	},
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		GET_ANIMAL_ID(state, action) {
			state.chatAnimals.animalId = action.payload;
		},
		MOVE_TO_CHAT(state, action) {
			const newAnimal = action.payload;
			state.chatAnimals.animalImage = newAnimal.animalImage;
			state.chatAnimals.animalName = newAnimal.animalNmae;
			state.chatAnimals.animalAge = newAnimal.animalAge;
			state.chatAnimals.breed = newAnimal.breed;
		},
		MOVE_ROOM(state, action) {
			state.chatRoom.roomId = action.payload;
		},
	},
});

export const { MOVE_TO_CHAT, MOVE_ROOM, GET_ANIMAL_ID } = chatSlice.actions;

export default chatSlice.reducer;
