import { useEffect, useRef, useState } from 'react';
import localToken from '../../../api/LocalToken';
import { useResponsive } from '../../../hooks/useResponsive';
import ChatInput from './ChatInput/ChatInput';
import { ChatBubbleLi, ChatBubbleUl, ChatRoomDiv } from './ChatRoom.style';
import ChatRoomHeader from './ChatRoomHeader/ChatRoomHeader';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useCounterUser from '../../../hooks/useCounterUser';
import AnimalInfo from './AnimalInffo/AnimalInfo';
import { useQuery } from 'react-query';
import { getChatDetails } from '../../../api/chatApi';

const ChatRoom = ({ setOpenChat }: any) => {
	const { $isMobile } = useResponsive();
	const scrollRef = useRef<HTMLUListElement | null>(null);
	const userId = useSelector((state: any) => state.user.id);
	const { roomId } = useParams();
	const counterUser = useCounterUser(Number(roomId));

	const [stompClient, setStompClient] = useState<any>(null);
	const [messages, setMessages] = useState<any>([]);

	const token = localToken.get();

	const { data: chatDetails, refetch } = useQuery(
		['getChatDetails', roomId],
		() => getChatDetails(Number(roomId)),
	);
	// console.log(chatDetails.messageList);

	useEffect(() => {
		const socket = new SockJS(
			'https://daeng-nyang-be-qyu5xzcspa-du.a.run.app/websocket',
		);
		const stomp = Stomp.over(socket);
		const headers = {
			access_token: token,
		};
		stomp.connect(headers, () => {
			setStompClient(stomp);
			console.log('연결');

			// setMessages(chatDetails.messageList);
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
					setMessages((prev: any) => [...prev, message]);
				},
			);
			return () => {
				subscription.unsubscribe();
			};
		}
	}, [stompClient, roomId]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const scrollToBottom = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	};

	return (
		<ChatRoomDiv $isMobile={$isMobile}>
			<ChatRoomHeader counterUser={counterUser} setOpenChat={setOpenChat} />
			<AnimalInfo
				counterUser={counterUser}
				chatDetails={chatDetails}
				refetch={refetch}
			/>
			<ChatBubbleUl ref={scrollRef}>
				{messages.length > 0 &&
					messages.map((message: any, index: number) => (
						<ChatBubbleLi
							key={index}
							className={message.senderId == userId ? 'sender' : 'receiver'}>
							{message.content}
						</ChatBubbleLi>
					))}
			</ChatBubbleUl>
			<ChatInput stompClient={stompClient} />
		</ChatRoomDiv>
	);
};

export default ChatRoom;
