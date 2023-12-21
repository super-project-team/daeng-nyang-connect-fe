import APIClient from './ApiClient';

const POST = '/post';
const MODIFY = '/modify';
const SCRAP = '/scrap';
const COMPLETE = '/complete';
const KIND = '/kind';
const CITY = 'city';
const ADOPTION_STATUS = '/adoptionStatus';
const GET_ALL = '/getAll';
const DELETE = '/delete';
const BASE_URL = 'http://43.201.83.255:8080';

const animalMockApi = new APIClient('/data');

export const getAnimalsMock = async (): Promise<any> => {
	return await animalMockApi.get('animals.json');
};

export const NewFamilyApi = new APIClient(BASE_URL + '/api/animal');

export const getNewFamily = async (): Promise<any> => {
	return await NewFamilyApi.get(GET_ALL);
};

export const adoptComplete = async (animalId: number, adoptUserId: number) => {
	return await NewFamilyApi.put(
		COMPLETE + `?animalId=${animalId}&&adoptedUserId=${adoptUserId}`,
	);
};
interface RegisterAnimal {
	animalName: string;
	kind: string;
	city: string;
	gender: string;
	breed: string;
	age: string;
	disease: string;
	training: string;
	neutering: string;
	healthCheck: string;
	nurturePeriod: string;
	files: File[];
	textReason: string;
	textEtc: string;
}

export const registerAnimal = async (data: RegisterAnimal): Promise<any> => {
	const formData = new FormData();

	for (const key in data) {
		if (key !== 'files') formData.append(key, (data as any)[key] as string);
	}

	if (data.files) {
		data.files.forEach((file) => {
			formData.append(`files`, file);
		});
	}
	console.log(data);
	return await NewFamilyApi.post(POST, formData);
};

export const modifyAnimal = async (boardId: number) => {
	return await NewFamilyApi.put(MODIFY + `/${boardId}`, {});
};

export const deleteAnimal = async (animalId: number): Promise<Response> => {
	console.log(BASE_URL + DELETE + `?${animalId}`);
	return await NewFamilyApi.delete(DELETE + `?${animalId}`);
};

export const scrapAnimal = async (animalId: number) => {
	return await NewFamilyApi.post(SCRAP + `/${animalId}`, {});
};

export const completeAnimal = async (boardId: number) => {
	return await NewFamilyApi.put(COMPLETE + `/${boardId}`, {});
};

export const kindAnimal = async (kind: string) => {
	return await NewFamilyApi.get(KIND + `/${kind}`);
};

export const cityAnimal = async (city: string) => {
	return await NewFamilyApi.get(CITY + `/${city}`);
};

export const adoptionStatusAnimal = async (adoptionStatus: string) => {
	return await NewFamilyApi.get(ADOPTION_STATUS + `/${adoptionStatus}`);
};
