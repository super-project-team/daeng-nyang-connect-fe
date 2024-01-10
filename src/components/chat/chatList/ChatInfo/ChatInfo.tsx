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
import {
	ADD_CHAT_COUNTER_USER,
	CHAT_ANIMAL,
} from '../../../../slice/chatSlice';
import { useEffect, useState } from 'react';

const ChatInfo = ({ chatinfo, key }: any) => {
	const { $isMobile } = useResponsive();
	const dispatch = useDispatch();
	const params = useParams();

	const [isClicked, setIsClicked] = useState<{ [key: number]: boolean }>({});
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
			dispatch(ADD_CHAT_COUNTER_USER(counterUserInfo));
			setCounterUser(counterUserInfo);
		}
	}, [chatinfo]);

	const changeRoomHandler = async (roomId: number) => {
		// console.log(roomId);
		setIsClicked((prev: any) => ({ [key]: !prev[key] }));
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
			}
		} catch (err) {
			console.error(err);
		}
	};

	const classChange = isClicked[key] ? 'active' : '';

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
