import { createSlice } from '@reduxjs/toolkit';

interface ChatAnimalInfo {
	animalId: number;
	animalName: string;
	age: string;
	breed: string;
	images: string[];
}
interface ChatRoom {
	roomId: number;
}

export interface ChatState {
	chatAnimals: ChatAnimalInfo[];
	chatRoom: ChatRoom;
}

const initialState: ChatState = {
	chatAnimals: [],
	chatRoom: {
		roomId: 0,
	},
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		MOVE_TO_CHAT(state, action) {
			const newAnimal = action.payload;
			state.chatAnimals.push({
				animalId: newAnimal.animalId,
				age: newAnimal.age,
				animalName: newAnimal.animalName,
				breed: newAnimal.breed,
				images: newAnimal.images,
			});
			return state;
		},
	},
});

export const { MOVE_TO_CHAT } = chatSlice.actions;

export default chatSlice.reducer;
