import { useDispatch, useSelector } from 'react-redux';
import { useResponsive } from '../../../../hooks/useResponsive';
import { UserImgDiv } from '../../ChatContentsBox.style';
import {
	ChatInfoDiv,
	ChatInfoEachDiv,
	ChatListLi,
	ChatTime,
	NoneReadCountEm,
} from './ChatInfo.style';
import { useNavigate, useParams } from 'react-router-dom';
import { getChatDetails, getChatLists } from '../../../../api/chatApi';
import { useQuery } from 'react-query';
import {
	ADD_CHAT_COUNTER_USER,
	CHAT_ANIMAL,
} from '../../../../slice/chatSlice';
import { useEffect, useState } from 'react';

const ChatInfo = ({
	chatinfo,
	click,
	isSelected,
	setOpenChat,
	openChat,
}: any) => {
	const { $isMobile } = useResponsive();
	const dispatch = useDispatch();
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
		click();
		try {
			const response = await getChatDetails(roomId);
			if (response) {
				const { chatRoomId, animalImage, animalAge, animalName, breed } =
					response;
				dispatch(
					CHAT_ANIMAL({
						chatRoomId: chatRoomId,
						animalAge: animalAge,
						animalImage: animalImage,
						animalName: animalName,
						breed: breed,
					}),
				);
				setOpenChat(!openChat);
				navigate(`/users/${currentUser}/chatBox/${chatRoomId}`);
			}
		} catch (err) {
			console.error(err);
		}
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
