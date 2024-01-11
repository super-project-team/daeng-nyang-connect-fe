import { useQuery } from 'react-query';
import ChatContentsBox from '../../components/chat/ChatContentsBox';
import { useResponsive } from '../../hooks/useResponsive';
import {
	ChatBoxInnerdiv,
	ChatBoxWrapperDiv,
	NoneChatListDiv,
} from './ChatBox.style';
import { getChatLists } from '../../api/chatApi';

const ChatBox = () => {
	const { $isMaxWidth, $isMobile } = useResponsive();
	const { data } = useQuery('getChatLists', getChatLists);

	return (
		<ChatBoxWrapperDiv>
			<ChatBoxInnerdiv $isMaxWidth={$isMaxWidth} $isMobile={$isMobile}>
				{data && data.length < 0 ? (
					<NoneChatListDiv>채팅을 시작해보세요!</NoneChatListDiv>
				) : (
					<ChatContentsBox />
				)}
			</ChatBoxInnerdiv>
		</ChatBoxWrapperDiv>
	);
};

export default ChatBox;
