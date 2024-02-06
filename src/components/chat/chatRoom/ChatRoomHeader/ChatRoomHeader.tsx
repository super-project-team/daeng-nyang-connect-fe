import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { LuMoreVertical } from 'react-icons/lu';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { deleteChat } from '../../../../api/chatApi';
import { useResponsive } from '../../../../hooks/useResponsive';
import { UserImgDiv } from '../../ChatContentsBox.style';
import {
	ChatRoomHeaderBdDiv,
	ChatRoomHeaderDiv,
	MoreUl,
	UserDiv,
} from './ChatRoomHeader.style';

const ChatRoomHeader = ({ counterUser }: any) => {
	const navigate = useNavigate();
	const { $isMobile } = useResponsive();
	const { roomId } = useParams();
	const userId = useSelector((state: any) => state.user.id);
	const queryClient = useQueryClient();

	const [openMenu, setOpenMenu] = useState(false);

	const backToChatListHandler = () => {
		navigate(`/users/${userId}/chatBox`);
	};

	const openMenuHandler = () => {
		setOpenMenu((prev) => !prev);
	};

	const { mutate } = useMutation(
		async (roomId: number) => {
			return deleteChat(roomId);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['getChatLists'], {
					exact: true,
				});
				navigate(`/users/${userId}/chatBox`);
			},
		},
	);

	const deleteChatRoomHandler = async () => {
		mutate(Number(roomId));
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
