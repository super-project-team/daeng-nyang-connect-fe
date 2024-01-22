import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getChatLists } from '../../api/chatApi';
import { useResponsive } from '../../hooks/useResponsive';
import Loading from '../../pages/Loading/Loading';
import { ChatInnerLeftDiv, ChatInnerRightDiv } from './ChatContentsBox.style';
import ChatCategory from './chatCategory/ChatCategory';
import ChatList from './chatList/ChatList';
import ChatRoom from './chatRoom/ChatRoom';

const ChatContentsBox = () => {
	const { $isMobile } = useResponsive();
	const {
		data: chatLists,
		isError,
		isLoading,
		refetch: chatRefetch,
	} = useQuery('getChatLists', getChatLists);

	const [openChat, setOpenChat] = useState(false);

	useEffect(() => {
		chatRefetch();
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
						chatRefetch={chatRefetch}
					/>
				) : null}
			</ChatInnerLeftDiv>
			{!$isMobile && (
				<ChatInnerRightDiv>
					{openChat ? (
						<ChatRoom chatRefetch={chatRefetch} setOpenChat={setOpenChat} />
					) : null}
				</ChatInnerRightDiv>
			)}
		</>
	);
};

export default ChatContentsBox;
