import { useDispatch } from 'react-redux';
import { useResponsive } from '../../../../hooks/useResponsive';
import { UserImgDiv } from '../../ChatContentsBox.style';
import {
	ChatInfoDiv,
	ChatInfoEachDiv,
	ChatListLi,
	ChatTime,
	NoneReadCountEm,
} from './ChatInfo.style';
import { useParams } from 'react-router-dom';
import { getChatDetails, getChatLists } from '../../../../api/chatApi';
import { useQuery } from 'react-query';
import { MOVE_ROOM, MOVE_TO_CHAT } from '../../../../slice/chatSlice';
import { useEffect, useState } from 'react';

const ChatInfo = ({ chatinfo }: any) => {
	const { $isMobile } = useResponsive();
	const dispatch = useDispatch();
	const params = useParams();

	const [isClicked, setIsClicked] = useState(false);
	const [counterUser, setCounterUser] = useState({
		userId: 0,
		nickname: '',
		userThumbnail: '',
	});

	const currentUser = Number(params.id);
	useEffect(() => {
		if (chatinfo) {
			const counterUserInfo = chatinfo.userList.find(
				(users: any) => users.userId !== currentUser,
			);
			setCounterUser(counterUserInfo);
		}
	}, [chatinfo]);

	const changeRoomHandler = async (roomId: number) => {
		// console.log(roomId);
		dispatch(MOVE_ROOM(roomId));
		setIsClicked((prev: any) => !prev);
		const response = await getChatDetails(roomId);
		if (response) dispatch(MOVE_TO_CHAT(response));
	};

	const classChange = isClicked ? 'active' : '';

	return (
		<ChatListLi
			className={classChange}
			$isMobile={$isMobile}
			onClick={() => changeRoomHandler(chatinfo.chatRoomId)}>
			<UserImgDiv size="36px">
				<img src={counterUser?.userThumbnail} alt="" />
			</UserImgDiv>
			<ChatInfoDiv>
				<ChatInfoEachDiv className="first-box">
					<p>{counterUser?.nickname}</p>
					{/* <ChatTime $isMobile={$isMobile}>30분 전</ChatTime> */}
				</ChatInfoEachDiv>
				<ChatInfoEachDiv>
					<p>메시지 미리보기</p>
					<NoneReadCountEm $isMobile={$isMobile}>4</NoneReadCountEm>
				</ChatInfoEachDiv>
			</ChatInfoDiv>
		</ChatListLi>
	);
};

export default ChatInfo;
