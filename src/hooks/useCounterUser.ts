import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getChatLists } from '../api/chatApi';
import { useSelector } from 'react-redux';

interface CounterUser {
	nickname: string;
	userId: number;
	userThumbnail: string;
}

const useCounterUser = (roomId: number) => {
	const { data: chatLists } = useQuery('getChatLists', getChatLists);

	const userId = useSelector((state: any) => state.user.id);

	const [counterUser, setCounterUser] = useState<CounterUser>({
		nickname: '',
		userId: 0,
		userThumbnail: '',
	});

	useEffect(() => {
		if (chatLists) {
			const currentRoom = chatLists.find(
				(chat: any) => chat.chatRoomId === roomId,
			);

			if (currentRoom) {
				const counterUser = currentRoom.userList.filter(
					(users: any) => users.userId != userId,
				);

				setCounterUser(counterUser[0]);
			}
		}
	}, [roomId]);
	return counterUser;
};

export default useCounterUser;
