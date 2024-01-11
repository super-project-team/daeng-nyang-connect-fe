import { useQuery } from 'react-query';
import { useResponsive } from '../../hooks/useResponsive';
import { ChatInnerLeftDiv, ChatInnerRightDiv } from './ChatContentsBox.style';
import ChatCategory from './chatCategory/ChatCategory';
import ChatList from './chatList/ChatList';
import ChatRoom from './chatRoom/ChatRoom';
import { getChatLists } from '../../api/chatApi';
import Loading from '../../pages/Loading/Loading';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ChatContentsBox = () => {
	const { $isMobile } = useResponsive();
	const {
		data: chatLists,
		isError,
		isLoading,
	} = useQuery('getChatLists', getChatLists);

	const [SelectedRoomId, setSelectedRoomId] = useState(0);
	console.log(SelectedRoomId);
	const chatAnimal = useSelector((state: any) => state.chat.chatAnimal);

	useEffect(() => {
		console.log(chatAnimal.chatRoomId);
	}, [chatAnimal]);

	if (isLoading) return <Loading />;
	return (
		<>
			<ChatInnerLeftDiv $isMobile={$isMobile}>
				<ChatCategory />
				{chatLists ? (
					<ChatList
						chatLists={chatLists}
						setSelectedRoomId={setSelectedRoomId}
					/>
				) : null}
			</ChatInnerLeftDiv>
			{!$isMobile && (
				<ChatInnerRightDiv>
					<ChatRoom chatLists={chatLists} />
				</ChatInnerRightDiv>
			)}
		</>
	);
};

export default ChatContentsBox;
