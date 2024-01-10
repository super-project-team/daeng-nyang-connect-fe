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

const ChatRoom = ({ chatLists }: any) => {
	const { $isMobile } = useResponsive();
	const params = useParams();
	const userId = Number(params.id);
	const roomId = useSelector((state: any) => state.chat.chatAnimal.chatRoomId);
	const counterUser = useSelector((state: any) => state.chat.chatCounterUser);

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
			stompClient.subscribe(`/topic/chat/${roomId}`, (response: any) => {
				const message = JSON.parse(response.body);
				console.log(message);
				console.log('구독');
				// setMessages((prev: any) => [...prev, message]);
			});
		}
		return () => {
			stompClient?.unsubscribe();
			console.log('return문');
		};
	}, [stompClient]);
	console.log('메시지 :', messages);
	return (
		<ChatRoomDiv $isMobile={$isMobile}>
			<ChatRoomHeader />
			<AnimalInfo chatLists={chatLists} />
			<ChatBubbleUl>
				{messages.length > 0 &&
					messages.map((message: any, index: number) => (
						<ChatBubbleLi
							key={index}
							className={counterUser !== userId ? 'sender' : 'receiver'}>
							{message.content}
						</ChatBubbleLi>
					))}
			</ChatBubbleUl>
			<ChatInput stompClient={stompClient} chatLists={chatLists} />
		</ChatRoomDiv>
	);
};

export default ChatRoom;
