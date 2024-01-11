import { useResponsive } from '../../../../hooks/useResponsive';
import { UserImgDiv } from '../../ChatContentsBox.style';
import {
	ChatRoomHeaderBdDiv,
	ChatRoomHeaderDiv,
	UserDiv,
} from './ChatRoomHeader.style';
import { LuMoreVertical } from 'react-icons/lu';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const ChatRoomHeader = ({ counterUser }: any) => {
	const navigate = useNavigate();
	const { $isMobile } = useResponsive();
	const userId = useSelector((state: any) => state.user.id);

	const backToChatListHandler = () => {
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
				<LuMoreVertical className="more-btn" />
			</ChatRoomHeaderBdDiv>
		</ChatRoomHeaderDiv>
	);
};

export default ChatRoomHeader;
