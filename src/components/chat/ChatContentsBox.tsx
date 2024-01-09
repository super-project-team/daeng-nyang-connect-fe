import { useQuery } from 'react-query';
import { useResponsive } from '../../hooks/useResponsive';
import { ChatInnerLeftDiv, ChatInnerRightDiv } from './ChatContentsBox.style';
import ChatCategory from './chatCategory/ChatCategory';
import ChatList from './chatList/ChatList';
import ChatRoom from './chatRoom/ChatRoom';
import { getChatLists } from '../../api/chatApi';
import Loading from '../../pages/Loading/Loading';

const ChatContentsBox = () => {
	const { $isMobile } = useResponsive();
	const {
		data: chatLists,
		isError,
		isLoading,
	} = useQuery('getChatLists', getChatLists);

	if (isLoading) return <Loading />;

	return (
		<>
			<ChatInnerLeftDiv $isMobile={$isMobile}>
				<ChatCategory />
				<ChatList chatLists={chatLists} />
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
