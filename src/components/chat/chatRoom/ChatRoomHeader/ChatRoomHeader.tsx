import { useResponsive } from '../../../../hooks/useResponsive';
import { UserImgDiv } from '../../ChatContentsBox.style';
import {
	ChatRoomHeaderBdDiv,
	ChatRoomHeaderDiv,
	MoreUl,
	UserDiv,
} from './ChatRoomHeader.style';
import { LuMoreVertical } from 'react-icons/lu';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
	deleteChat,
	getChatDetails,
	getChatLists,
} from '../../../../api/chatApi';
import { useQuery } from 'react-query';

const ChatRoomHeader = ({ counterUser, chatRefetch, setOpenChat }: any) => {
	const navigate = useNavigate();
	const { $isMobile } = useResponsive();
	const userId = useSelector((state: any) => state.user.id);
	const { roomId } = useParams();

	const [openMenu, setOpenMenu] = useState(false);

	const { data: chatDetails, refetch } = useQuery('getChatDetails', () =>
		getChatDetails(Number(roomId)),
	);

	useEffect(() => {
		refetch();
	}, [chatDetails]);

	const backToChatListHandler = () => {
		navigate(`/users/${userId}/chatBox`);
	};

	const openMenuHandler = () => {
		setOpenMenu((prev) => !prev);
	};

	const deleteChatRoomHandler = async () => {
		await deleteChat(Number(roomId));
		chatRefetch();
		setOpenChat((prev: boolean) => !prev);
		navigate(`/users/${userId}/chatBox`);
	};

	return (
		<ChatRoomHeaderDiv $isMobile={$isMobile}>
			<ChatRoomHeaderBdDiv>
				{$isMobile && (
					<IoIosArrowBack
						className="back-icon"
						onClick={backToChatListHandler}
					/>
				)}
				{counterUser && (
					<UserDiv $isMobile={$isMobile}>
						{!$isMobile && (
							<UserImgDiv size="44px">
								<img src={counterUser?.userThumbnail} alt="" />
							</UserImgDiv>
						)}
						<p>{counterUser?.nickname}</p>
					</UserDiv>
				)}
				<div style={{ position: 'relative' }}>
					<LuMoreVertical className="more-btn" onClick={openMenuHandler} />
					{openMenu && (
						<MoreUl>
							<li>신고하기</li>
							<li onClick={deleteChatRoomHandler}>채팅방 나가기</li>
						</MoreUl>
					)}
				</div>
			</ChatRoomHeaderBdDiv>
		</ChatRoomHeaderDiv>
	);
};

export default ChatRoomHeader;
