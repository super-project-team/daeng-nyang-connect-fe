import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useResponsive } from '../../../../hooks/useResponsive';
import { ChatInputDiv, SendBtn, TextArea } from './ChatInput.style';
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

const token = localToken.get();

const ChatInput = ({ stompClient, chatLists }: any) => {
	const { $isMobile } = useResponsive();
	const roomId = useSelector((state: any) => state.chat.chatRoom.roomId);
	const [messageInput, setMessageInput] = useState('');
	const params = useParams();
	const currentUser = Number(params.id);
	// const counterUser = chatLists.userList.find(
	// 	(users: any) => users.user.userId !== currentUser,
	// );
	// console.log(
	// 	chatLists.find((chats: any) => chats.chatRoomId === roomId).userList,
	// );

	const sendMessage = () => {
		if (stompClient && messageInput) {
			const headers = {
				access_token: token,
			};

			const message = {
				roomId: roomId,
				content: messageInput,
			};

			// stompClient.send('app/sendMessage', headers, JSON.stringify(message));
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
			<TextArea
				placeholder="메시지를 입력하세요."
				value={messageInput}
				onChange={(e) => {
					e.stopPropagation();
					setMessageInput(e.target.value);
				}}
			/>
			<SendBtn $isMobile={$isMobile} onClick={sendMessage}>
				전송
			</SendBtn>
		</ChatInputDiv>
	);
};

export default ChatInput;
