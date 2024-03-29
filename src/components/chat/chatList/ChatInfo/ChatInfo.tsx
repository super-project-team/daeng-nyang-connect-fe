import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponsive } from '../../../../hooks/useResponsive';
import { UserImgDiv } from '../../ChatContentsBox.style';
import {
	ChatInfoDiv,
	ChatInfoEachDiv,
	ChatListLi,
	ChatTime,
	NoneReadCountEm,
} from './ChatInfo.style';

const ChatInfo = ({ chatinfo, click, isSelected }: any) => {
	const { $isMobile } = useResponsive();
	const navigate = useNavigate();
	const currentUser = useSelector((state: any) => state.user.id);

	const [counterUser, setCounterUser] = useState({
		userId: 0,
		nickname: '',
		userThumbnail: '',
	});

	useEffect(() => {
		if (chatinfo) {
			const counterUserInfo = chatinfo.userList.filter(
				(users: any) => users.userId != currentUser,
			);
			setCounterUser(counterUserInfo[0]);
		}
	}, []);

	const changeRoomHandler = async (
		e: React.MouseEvent<HTMLLIElement>,
		roomId: number,
	) => {
		e.stopPropagation();
		click(roomId);

		if ($isMobile) navigate(`/users/${currentUser}/chatRoom/${roomId}`);
		else navigate(`/users/${currentUser}/chatBox/${roomId}`);
	};

	return (
		<ChatListLi
			className={isSelected ? 'active' : ''}
			$isMobile={$isMobile}
			onMouseDown={(e) => changeRoomHandler(e, chatinfo.chatRoomId)}>
			<UserImgDiv size="36px">
				<img src={counterUser?.userThumbnail} alt="" />
			</UserImgDiv>
			<ChatInfoDiv>
				<ChatInfoEachDiv className="first-box">
					<p>{counterUser?.nickname}</p>
					<ChatTime $isMobile={$isMobile}>?분 전</ChatTime>
				</ChatInfoEachDiv>
				<ChatInfoEachDiv>
					<p>{chatinfo?.latestContent}</p>
					{/* <NoneReadCountEm $isMobile={$isMobile}>4</NoneReadCountEm> */}
				</ChatInfoEachDiv>
			</ChatInfoDiv>
		</ChatListLi>
	);
};

export default ChatInfo;
