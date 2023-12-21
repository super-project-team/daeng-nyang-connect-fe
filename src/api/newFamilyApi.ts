import APIClient from './ApiClient';

interface RegisterAnimal {
	animalName: string;
	kind: string;
	city: string;
	gender: string;
	breed: string;
	age: string;
	disease: string;
	training: string;
	neutering: string | boolean;
	healthCheck: string;
	nurturePeriod: string;
	files: File[];
	textReason: string;
	textEtc: string;
}

const POST = 'post';
const MODIFY = 'modify';
const SCRAP = 'scrap';
const COMPLETE = 'complete';
const KIND = 'kind';
const CITY = 'city';
const ADOPTION_STATUS = 'adoptionStatus';
const GET_ALL = 'getAll';
const DELETE = '/delete';
const BASE_URL = 'http://3.35.16.126:8080';

const animalMockApi = new APIClient('/data');

export const getAnimalsMock = async (): Promise<any> => {
	return await animalMockApi.get('animals.json');
};

export const NewFamilyApi = new APIClient(BASE_URL + '/api/animal');

export const BaseApi = new APIClient(BASE_URL + '/api');

export const getNewFamily = async (): Promise<any> => {
	return await NewFamilyApi.get(GET_ALL);
};

export const adoptComplete = async (animalId: number, adoptUserId: number) => {
	return await NewFamilyApi.put(
		COMPLETE + `?animalId=${animalId}&&adoptedUserId=${adoptUserId}`,
	);
};

export const registerAnimal = async (data: RegisterAnimal): Promise<any> => {
	const { files } = data;
	const formData = new FormData();

	Object.keys(data).forEach((key) => {
		if (key !== 'files') {
			const value = data[key as keyof RegisterAnimal];
			if (value !== undefined) {
				formData.append(key, value.toString());
			}
		}
	});

	if (files && files.length > 0) {
		for (const file of files) {
			console.log(file);
			formData.append('files', file);
		}
	}

	try {
		const response = await NewFamilyApi.post(POST, formData);
		console.log('Server Response:', response);
		return response;
	} catch (error) {
		console.error('Error during registration:', error);
		throw error;
	}
};

export const deleteAnimal = async (animalId: number) => {
	console.log(BASE_URL + DELETE + `?${animalId}=?`);
	return await NewFamilyApi.delete(DELETE + `?animalId=${animalId}`);
};

export const modifyAnimal = async (
	animalId: number,
	data: RegisterAnimal,
): Promise<any> => {
	const { files } = data;
	const formData = new FormData();

	Object.keys(data).forEach((key) => {
		if (key !== 'files') {
			const value = data[key as keyof RegisterAnimal];
			if (value !== undefined) {
				formData.append(key, value.toString());
			}
		}
	});

	if (files && files.length > 0) {
		for (const file of files) {
			console.log(file);
			formData.append('files', file);
		}
	}

	return await NewFamilyApi.put(MODIFY + `?animalId=${animalId}`, formData);
};

export const scrapAnimal = async (animalId: number) => {
	return await NewFamilyApi.post(SCRAP + `?animalId=${animalId}`);
};

export const getScrappedAnimal = async (): Promise<any> => {
	return await BaseApi.get('/myPage/myScrapAnimal');
};

export const completeAnimal = async (animalId: number) => {
	return await NewFamilyApi.put(COMPLETE + `/${animalId}`, {});
};

export const kindAnimal = async (kind: string) => {
	return await NewFamilyApi.get(KIND + `/${kind}`);
};

export const cityAnimal = async (city: string) => {
	return await NewFamilyApi.get(CITY + `/${city}`);
};

export const adoptionStatusAnimal = async (
	adoptionStatus: string,
): Promise<{ adoptionStatus: string }> => {
	return await NewFamilyApi.get(
		ADOPTION_STATUS + `/adoptionStatus/${adoptionStatus}`,
	);
};

// export const getNewFamilyWithFilters = async (filters: any): Promise<any> => {
// 	return await NewFamilyApi.get(GET_ALL, { params: filters });
// };
