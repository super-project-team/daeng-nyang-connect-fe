import ChatContentsBox from '../../components/chat/ChatContentsBox';
import { useResponsive } from '../../hooks/useResponsive';
import { ChatBoxInnerdiv, ChatBoxWrapperDiv } from './ChatBox.style';

const ChatBox = () => {
	const { $isMaxWidth, $isMobile } = useResponsive();
	return (
		<ChatBoxWrapperDiv>
			<ChatBoxInnerdiv $isMaxWidth={$isMaxWidth} $isMobile={$isMobile}>
				<ChatContentsBox />
			</ChatBoxInnerdiv>
		</ChatBoxWrapperDiv>
	);
};

export default ChatBox;
