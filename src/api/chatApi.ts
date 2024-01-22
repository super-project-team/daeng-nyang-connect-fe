import APIClient from './ApiClient';

const GET = 'rooms';
const POST = 'add?animalId=';
const DETAIL = 'room/detail?chatRoomId=';
const DELETE = 'delete?roomId=';
const BASE_URL = 'https://daeng-nyang-be-qyu5xzcspa-du.a.run.app';

export const chatApi = new APIClient(BASE_URL + '/api/chat/');

export const getChatLists = async (): Promise<any> => {
	return await chatApi.get(GET);
};
export const makeChatRoom = async (animalId: any): Promise<any> => {
	return await chatApi.post(POST + `${animalId}`);
};
export const getChatDetails = async (chatRoomId: number): Promise<any> => {
	return await chatApi.get(DETAIL + chatRoomId);
};
export const deleteChat = async (roomId: number) => {
	return await chatApi.delete(DELETE + roomId);
};
