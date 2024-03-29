import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import localToken from '../../../../api/LocalToken';
import { useResponsive } from '../../../../hooks/useResponsive';
import { ChatInputDiv, ChatTextInput, SendBtn } from './ChatInput.style';
import { useParams } from 'react-router-dom';

const ChatInput = ({ stompClient }: any) => {
	const token = localToken.get();
	const { $isMobile } = useResponsive();
	const { roomId } = useParams();
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
