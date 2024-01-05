import { useResponsive } from '../../hooks/useResponsive';
import { ChatInnerLeftDiv, ChatInnerRightDiv } from './ChatContentsBox.style';
import ChatCategory from './chatCategory/ChatCategory';
import ChatList from './chatList/ChatList';
import ChatRoom from './chatRoom/ChatRoom';

const ChatContentsBox = () => {
	const { $isMobile } = useResponsive();

	return (
		<>
			<ChatInnerLeftDiv $isMobile={$isMobile}>
				<ChatCategory />
				<ChatList />
			</ChatInnerLeftDiv>
			{!$isMobile && (
				<ChatInnerRightDiv>
					<ChatRoom />
				</ChatInnerRightDiv>
			)}
		</>
	);
};

export default ChatContentsBox;
