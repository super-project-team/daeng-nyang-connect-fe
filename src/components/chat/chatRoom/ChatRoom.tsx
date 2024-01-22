import { useResponsive } from '../../../hooks/useResponsive';
// import AnimalInfo from './AnimalInffo/AnimalInfo';
import ChatInput from './ChatInput/ChatInput';
import { ChatRoomDiv } from './ChatRoom.style';
import ChatRoomHeader from './ChatRoomHeader/ChatRoomHeader';

const ChatRoom = () => {
	const { $isMobile } = useResponsive();
	console.log('ChatRoom', ChatRoom);
	return (
		<ChatRoomDiv $isMobile={$isMobile}>
			<ChatRoomHeader />
			{/* <AnimalInfo /> */}
			<ChatInput />
		</ChatRoomDiv>
	);
};

export default ChatRoom;
