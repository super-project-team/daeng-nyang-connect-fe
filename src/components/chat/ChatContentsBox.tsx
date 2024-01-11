import { useQuery } from 'react-query';
import { useResponsive } from '../../hooks/useResponsive';
import { ChatInnerLeftDiv, ChatInnerRightDiv } from './ChatContentsBox.style';
import ChatCategory from './chatCategory/ChatCategory';
import ChatList from './chatList/ChatList';
import ChatRoom from './chatRoom/ChatRoom';
import { getChatLists } from '../../api/chatApi';
import Loading from '../../pages/Loading/Loading';
import { useEffect, useState } from 'react';
import { ChatRoomDiv } from './chatRoom/ChatRoom.style';

const ChatContentsBox = () => {
	const { $isMobile } = useResponsive();
	const {
		data: chatLists,
		isError,
		isLoading,
		refetch,
	} = useQuery('getChatLists', getChatLists);

	const [openChat, setOpenChat] = useState(false);

	useEffect(() => {
		refetch();
	}, [chatLists]);

	if (isLoading) return <Loading />;
	return (
		<>
			<ChatInnerLeftDiv $isMobile={$isMobile}>
				<ChatCategory />
				{chatLists ? (
					<ChatList
						chatLists={chatLists}
						setOpenChat={setOpenChat}
						openChat={openChat}
					/>
				) : null}
			</ChatInnerLeftDiv>
			{!$isMobile && (
				<ChatInnerRightDiv>
					{openChat ? (
						<ChatRoom />
					) : (
						<ChatRoomDiv $isMobile={$isMobile}></ChatRoomDiv>
					)}
				</ChatInnerRightDiv>
			)}
		</>
	);
};

export default ChatContentsBox;
