import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useResponsive } from '../../../../hooks/useResponsive';
import { ChatInputDiv, SendBtn, ChatTextInput } from './ChatInput.style';
import { FiPlusCircle } from 'react-icons/fi';
import localToken from '../../../../api/LocalToken';
import { getChatLists } from '../../../../api/chatApi';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface Message {
	username: string;
	content: string;
}

const ChatInput = ({ stompClient }: any) => {
	const token = localToken.get();
	const { $isMobile } = useResponsive();
	const roomId = useSelector((state: any) => state.chat.chatAnimal.chatRoomId);
	const userId = useSelector((state: any) => state.user.id);
	const [messageInput, setMessageInput] = useState('');

	const sendMessage = () => {
		if (stompClient && messageInput) {
			const headers = { access_token: token };
			const message = {
				roomId: roomId,
				content: messageInput.trim(),
				senderId: userId,
			};

			stompClient.send('/app/sendMessage', headers, JSON.stringify(message));
			stompClient.send(
				'/topic/chat/' + roomId,
				headers,
				JSON.stringify(message),
			);

			// stompClient.publish({
			// 	destination: '/topic/chat/' + roomId,
			// 	body: JSON.stringify(message),
			// 	headers: { access_token: token },
			// });

			setMessageInput('');
		}
	};

	return (
		<ChatInputDiv $isMobile={$isMobile}>
			<FiPlusCircle className="plus-btn" />
			<ChatTextInput
				placeholder="메시지를 입력하세요."
				value={messageInput}
				onChange={(e) => {
					e.stopPropagation();
					setMessageInput(e.target.value);
				}}
				onKeyDown={(e) => {
					e.keyCode === 13 ? sendMessage() : null;
				}}
			/>
			<SendBtn $isMobile={$isMobile} onClick={sendMessage}>
				전송
			</SendBtn>
		</ChatInputDiv>
	);
};

export default ChatInput;
