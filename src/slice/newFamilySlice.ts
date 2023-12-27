import { createSlice } from '@reduxjs/toolkit';

export interface NewFamilyState {
	animals: AnimalItem[];
	filteredAnimals: AnimalItem[];
}

export interface AnimalItem {
	boardId: number;
	animalName: string;
	kind: string;
	gender: string;
	breed: string;
	age: string;
	disease: string;
	training: string;
	neutering: string;
	healthCheck: boolean;
	nurturePeriod: string;
	files: string[];
	textReason: string;
	textEtc: string;
	adoptionStatus: string;
	createAt: string;
	isScrapped: boolean;
	city: string;
}

const initialState: NewFamilyState = {
	animals: [],
	filteredAnimals: [],
};

const newFamilySlice = createSlice({
	name: 'animals',
	initialState,
	reducers: {
		SET_ANIMALS(state, action) {
			state = action.payload;
			return state;
		},
		SET_INPUT_VALUE(state, action) {
			state.animals.push(action.payload);
		},
		DELETE_ANIMAL_ITEM(state, action) {
			state.animals.splice(action.payload, 1);
		},
		MODIFY_ANIMAL_ITEM(state, action) {
			const { index, modifiedAnimal } = action.payload;
			state.animals[index] = modifiedAnimal;
		},
		TOGGLE_SCRAP(state, action) {
			const index = action.payload;
			state.animals[index].isScrapped = !state.animals[index].isScrapped;
		},
		FILTER_ANIMALS(state, action) {
			const filters = action.payload;

			const cityFilter = (animal: AnimalItem) =>
				!filters?.city || animal.city === filters.city;

			const adoptionStatusFilter = (animal: AnimalItem) =>
				!filters?.adoptionStatus ||
				animal.adoptionStatus == filters.adoptionStatus;

			const kindFilter = (animal: AnimalItem) =>
				!filters?.kind || animal.kind === filters.kind;

			state.filteredAnimals = state.animals.filter(
				(animal) =>
					cityFilter(animal) &&
					adoptionStatusFilter(animal) &&
					kindFilter(animal),
			);
		},
		SET_COMPLETE_STATUS(state, action) {
			const { index, isComplete } = action.payload;
			state.animals[index].adoptionStatus = isComplete
				? 'complete'
				: 'progress';
		},
	},
});

export const {
	SET_ANIMALS,
	SET_INPUT_VALUE,
	DELETE_ANIMAL_ITEM,
	MODIFY_ANIMAL_ITEM,
	TOGGLE_SCRAP,
	FILTER_ANIMALS,
	SET_COMPLETE_STATUS,
} = newFamilySlice.actions;

export default newFamilySlice.reducer;
