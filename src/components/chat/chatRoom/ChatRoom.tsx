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
import useCounterUser from '../../../hooks/useCounterUser';

const ChatRoom = () => {
	const { $isMobile } = useResponsive();
	const userId = useSelector((state: any) => state.user.id);
	const roomId = useSelector((state: any) => state.chat.chatAnimal.chatRoomId);
	const counterUser = useCounterUser(roomId);

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
	}, [stompClient, roomId]);

	return (
		<ChatRoomDiv $isMobile={$isMobile}>
			<ChatRoomHeader counterUser={counterUser} />
			<AnimalInfo counterUser={counterUser} />
			<ChatBubbleUl
				className={counterUser.userId != userId ? 'sender' : 'receiver'}>
				{messages.length > 0 &&
					messages.map((message: any, index: number) => (
						<ChatBubbleLi
							key={index}
							className={counterUser.userId != userId ? 'sender' : 'receiver'}>
							{message.content}
						</ChatBubbleLi>
					))}
			</ChatBubbleUl>
			<ChatInput stompClient={stompClient} />
		</ChatRoomDiv>
	);
};

export default ChatRoom;
