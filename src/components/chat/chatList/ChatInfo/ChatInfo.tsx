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

type BgProps = {
	className?: string;
};

const ChatInfo = ({ className }: BgProps) => {
	const { $isMobile } = useResponsive();
	const dispatch = useDispatch();

	const changeRoomHandler = (roomId: string) => {
		console.log(roomId);
	};

	return (
		<ChatListLi
			className={className}
			$isMobile={$isMobile}
			onClick={() => changeRoomHandler('roomId2')}>
			<UserImgDiv size="36px">
				<img src="/assets/community1.jpg" alt="" />
			</UserImgDiv>
			<ChatInfoDiv>
				<ChatInfoEachDiv className="first-box">
					<p>유저닉네임</p>
					<ChatTime $isMobile={$isMobile}>30분 전</ChatTime>
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
