import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useResponsive } from '../../../../hooks/useResponsive';
import { ChatInputDiv, SendBtn, TextArea } from './ChatInput.style';
import { FiPlusCircle } from 'react-icons/fi';
import { Client, IFrame, IMessage, Stomp } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { ChatState } from './../../../../slice/chatSlice';
import { io } from 'socket.io-client';
import localToken from '../../../../api/LocalToken';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { subscribe } from 'diagnostics_channel';

interface Message {
	username: string;
	content: string;
}
interface CustomIFrame extends IFrame {
	access_token: string | null;
}
const socketUrl = 'ws://52.79.108.20:8080/websocket';

const ChatInput = ({ stompClient, setMessages }: any) => {
	const { $isMobile } = useResponsive();
	const [messageInput, setMessageInput] = useState('');

	const sendMessage = () => {
		if (stompClient && messageInput) {
			const headers = {
				access_token: 'your-access-token',
			};

			const message = {
				content: messageInput,
			};

			stompClient.send('/app/sendMessage', headers, JSON.stringify(message));
			setMessageInput('');
		}
	};
	useEffect(() => {
		if (stompClient) {
			stompClient.subscribe('/topic/messages', (response: any) => {
				const message = JSON.parse(response.body);
				setMessages((prev: any) => [...prev, message]);
			});
		}
	}, [stompClient]);

	return (
		<ChatInputDiv $isMobile={$isMobile}>
			<FiPlusCircle className="plus-btn" />
			<TextArea
				placeholder="메시지를 입력하세요."
				onChange={(e) => setMessageInput(e.target.value)}
			/>
			<SendBtn $isMobile={$isMobile} onClick={sendMessage}>
				전송
			</SendBtn>
		</ChatInputDiv>
	);
};

export default ChatInput;
