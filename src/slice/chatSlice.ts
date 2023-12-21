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
			const existingAnimal = state.chatAnimals.find(
				(animal) => animal.animalId === newAnimal.animalId,
			);
			if (!existingAnimal) {
				state.chatAnimals.push({
					animalId: newAnimal.animalId,
					animalName: newAnimal.animalName,
					age: newAnimal.age,
					breed: newAnimal.breed,
					images: newAnimal.images,
				});
			}
		},
		ROOM_ID_CHECK(state, action) {
			return (state.chatRoom.roomId = action.payload);
		},
	},
});

export const { MOVE_TO_CHAT, ROOM_ID_CHECK } = chatSlice.actions;

export default chatSlice.reducer;
