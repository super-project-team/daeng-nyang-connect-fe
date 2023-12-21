import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useResponsive } from '../../../../hooks/useResponsive';
import { ChatInputDiv, SendBtn, TextArea } from './ChatInput.style';
import { FiPlusCircle } from 'react-icons/fi';
import SockJS from 'sockjs-client';
import { Client, IFrame, IMessage, Stomp } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { ChatState } from './../../../../slice/chatSlice';
import WebSocket from 'ws';
import { io } from 'socket.io-client';
import localToken from '../../../../api/LocalToken';

interface Message {
	username: string;
	content: string;
}
interface CustomIFrame extends IFrame {
	access_token: string | null;
}
const socketUrl = 'ws://3.35.16.126:8080/websocket';

const ChatInput = () => {
	const { $isMobile } = useResponsive();

	const [chat, setChat] = useState('');
	const [chatList, setChatList] = useState<string[]>([]);
	const [clientData, setClientData] = useState<Client>();

	const token = localToken.get();
	// useEffect(() => {
	// 	const socket = io(socketUrl, {
	// 		transports: ['websocket', 'polling'],
	// 		extraHeaders: {
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 	});
	// 	socket.on('connect', () => {
	// 		console.log('Socket.io 연결이 열렸습니다.');
	// 		socket.emit('chat message', '가나요?');
	// 	});

	// 	socket.on('message', (data: any) => {
	// 		console.log('메시지 수신:', data);
	// 	});

	// 	socket.on('disconnect', () => {
	// 		console.log('Socket.io 연결이 닫혔습니다.');
	// 	});

	// 	socket.on('error', (error: any) => {
	// 		console.error('Socket.io 오류: ', error);
	// 	});

	// 	// 컴포넌트 언마운트 시 소켓 닫기
	// 	return () => {
	// 		socket.disconnect();
	// 	};
	// }, []);

	// Optional callback function to handle connection open event
	const onConnect = () => {
		try {
			console.log('Connected to WebSocket');
			const stompClient = new Client({
				brokerURL: socketUrl,
				debug: function (str) {
					console.log(str);
				},
				onConnect: () => {
					stompClient.subscribe('/topic', callback);
				},
			});

			const headers: any = {
				access_token: localToken.get(),
			};
			stompClient.onConnect(headers);
			stompClient.activate();
			setClientData(stompClient);
		} catch (err) {
			console.error(err);
		}
	};

	const disConnect = () => {
		if (clientData != null) {
			if (clientData.connected) clientData.deactivate();
		}
	};

	useEffect(() => {
		onConnect();
		return () => disConnect();
	}, []);

	const callback = function (message: any) {
		if (message.body) {
			const msg = JSON.parse(message.body);
			setChatList((chats) => [...chats, msg]);
		}
	};

	const sendChat = () => {
		if (!clientData?.connected) return;

		clientData?.publish({
			destination: '/topic',
			body: JSON.stringify({
				type: '',
				sender: 1,
				channelId: '1',
				data: chat,
			}),
		});

		setChat('');
	};

	const textAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setChat(e.target.value);
	};

	return (
		<ChatInputDiv $isMobile={$isMobile}>
			<FiPlusCircle className="plus-btn" />
			<TextArea
				placeholder="메시지를 입력하세요."
				onChange={textAreaHandler}
				onKeyDown={(e) => {
					if (e.keyCode === 13) sendChat();
				}}
			/>
			<SendBtn $isMobile={$isMobile} onClick={sendChat}>
				전송
			</SendBtn>
		</ChatInputDiv>
	);
};

export default ChatInput;
