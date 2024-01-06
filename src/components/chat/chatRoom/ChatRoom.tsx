import { useEffect, useState } from 'react';
import localToken from '../../../api/LocalToken';
import { useResponsive } from '../../../hooks/useResponsive';
import AnimalInfo from './AnimalInffo/AnimalInfo';
import ChatInput from './ChatInput/ChatInput';
import { ChatRoomDiv } from './ChatRoom.style';
import ChatRoomHeader from './ChatRoomHeader/ChatRoomHeader';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useSelector } from 'react-redux';

const ChatRoom = () => {
	const { $isMobile } = useResponsive();
	const user = useSelector((state: any) => state.user);

	const [stompClient, setStompClient] = useState<any>(null);
	const [messages, setMessages] = useState<any>([]);

	const token = localToken.get();

	// 첫번째 방법

	useEffect(() => {
		const socket = new SockJS('http://52.79.108.20:8080/websocket');
		const stomp = Stomp.over(socket);
		stomp.connect({}, () => {
			setStompClient(stomp);
			console.log('연결');
		});

		return () => {
			if (stompClient) {
				stompClient.disconnect();
			}
		};
	}, []);

	const acceptChatRequest = (receiverUsername: string) => {
		if (stompClient) {
			const headers = {
				access_token: 'your-access-token',
			};

			const request = {
				receiverUsername: receiverUsername,
			};

			stompClient.send(
				'/app/acceptChatRequest',
				headers,
				JSON.stringify(request),
			);
		}
	};

	return (
		<ChatRoomDiv $isMobile={$isMobile}>
			<ChatRoomHeader />
			<AnimalInfo />
			<ChatInput stompClient={stompClient} setMessages={setMessages} />
			<button onClick={() => acceptChatRequest(user.nickname)}>수락</button>
		</ChatRoomDiv>
	);
};

export default ChatRoom;
