import { useEffect, useState } from 'react';
import localToken from '../../../api/LocalToken';
import { useResponsive } from '../../../hooks/useResponsive';
import AnimalInfo from './AnimalInffo/AnimalInfo';
import ChatInput from './ChatInput/ChatInput';
import { ChatBubbleLi, ChatBubbleUl, ChatRoomDiv } from './ChatRoom.style';
import ChatRoomHeader from './ChatRoomHeader/ChatRoomHeader';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface CounterUser {
	nickname: string;
	userId: number;
	userThumbnail: string;
}
const ChatRoom = ({ chatLists }: any) => {
	const { $isMobile } = useResponsive();
	const params = useParams();
	const userId = Number(params.id);
	const chatAnimals = useSelector((state: any) => state.chat.chatAnimal);
	const roomId = chatAnimals.chatRoomId;

	const [counterUser, setCounterUser] = useState<CounterUser>({
		nickname: '',
		userId: 0,
		userThumbnail: '',
	});

	useEffect(() => {
		if (chatLists) {
			const currentRoom = chatLists.find(
				(chat: any) => chat.chatRoomId === chatAnimals.chatRoomId,
			);
			if (currentRoom) {
				const counterUser = currentRoom.userList.filter(
					(users: any) => users.userId !== userId,
				);

				setCounterUser(counterUser[0]);
			}
		}
	}, [chatAnimals]);

	const [stompClient, setStompClient] = useState<any>(null);
	const [messages, setMessages] = useState<any>([]);

	const token = localToken.get();

	useEffect(() => {
		const socket = new SockJS('http://52.79.108.20:8080/websocket');
		const stomp = Stomp.over(socket);
		const headers = {
			access_token: token,
		};
		stomp.connect(headers, () => {
			setStompClient(stomp);
			console.log('연결');
		});

		// 컴포넌트 언마운트시 연결해제
		return () => {
			if (stomp.connected) {
				stomp.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		if (stompClient) {
			const subscription = stompClient.subscribe(
				`/topic/chat/${roomId}`,
				(response: any) => {
					const message = JSON.parse(response.body);
					console.log('구독');
					if (!messages.some((msg: any) => msg.roomId === message.roomId)) {
						setMessages((prev: any) => [...prev, message]);
					}
				},
			);
			return () => {
				subscription.unsubscribe();
			};
		}
	}, [stompClient, chatAnimals]);

	return (
		<ChatRoomDiv $isMobile={$isMobile}>
			<ChatRoomHeader counterUser={counterUser} />
			<AnimalInfo chatLists={chatLists} />
			<ChatBubbleUl>
				{messages.length > 0 &&
					messages.map((message: any, index: number) => (
						<ChatBubbleLi
							key={index}
							className={counterUser.userId !== userId ? 'sender' : 'receiver'}>
							{message.content}
						</ChatBubbleLi>
					))}
			</ChatBubbleUl>
			<ChatInput stompClient={stompClient} chatLists={chatLists} />
		</ChatRoomDiv>
	);
};

export default ChatRoom;
