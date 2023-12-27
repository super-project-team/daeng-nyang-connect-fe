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

const ChatRoomHeader = () => {
	const navigate = useNavigate();
	const { $isMobile } = useResponsive();
	const id = 3;

	const backToChatListHandler = () => {
		navigate(`/users/${id}/chatBox`);
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
				<UserDiv $isMobile={$isMobile}>
					{!$isMobile && (
						<UserImgDiv size="44px">
							<img src="/assets/community3.jpg" alt="" />
						</UserImgDiv>
					)}
					<p>닉네임</p>
				</UserDiv>
				<LuMoreVertical className="more-btn" />
			</ChatRoomHeaderBdDiv>
		</ChatRoomHeaderDiv>
	);
};

export default ChatRoomHeader;
