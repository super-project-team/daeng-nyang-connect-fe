import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getChatLists } from '../../api/chatApi';
import { useResponsive } from '../../hooks/useResponsive';
import Loading from '../../pages/Loading/Loading';
import { ChatInnerLeftDiv, ChatInnerRightDiv } from './ChatContentsBox.style';
import ChatCategory from './chatCategory/ChatCategory';
import ChatList from './chatList/ChatList';
import ChatRoom from './chatRoom/ChatRoom';
import { useParams } from 'react-router-dom';

const ChatContentsBox = () => {
	const { $isMobile } = useResponsive();
	const {
		data: chatLists,
		isError,
		isLoading,
		refetch: chatRefetch,
	} = useQuery('getChatLists', getChatLists);
	const { roomId } = useParams();

	useEffect(() => {
		chatRefetch();
	}, [chatLists]);

	if (isLoading) return <Loading />;
	return (
		<>
			<ChatInnerLeftDiv $isMobile={$isMobile}>
				<ChatCategory />
				{chatLists ? (
					<ChatList chatLists={chatLists} chatRefetch={chatRefetch} />
				) : null}
			</ChatInnerLeftDiv>
			{!$isMobile && (
				<ChatInnerRightDiv>
					{roomId ? <ChatRoom chatRefetch={chatRefetch} /> : null}
				</ChatInnerRightDiv>
			)}
		</>
	);
};

export default ChatContentsBox;
