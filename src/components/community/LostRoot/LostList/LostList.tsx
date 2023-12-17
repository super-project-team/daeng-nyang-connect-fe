import { useNavigate } from 'react-router-dom';
import {
	Button,
	ButtonWrap,
	DateText,
	ImgWrap,
	LostLi,
	PlaceText,
	TextWrap,
} from './LostList.style';
import { useResponsive } from '../../../../hooks/useResponsive';
import { Board } from '../../../../types/BoardTypes';
import formatDate from '../../../../utils/formatDate';

interface LostPetProps {
	list: Board;
}

const LostList = ({ list }: LostPetProps) => {
	const navigate = useNavigate();
	const { $isTablet, $isMobile } = useResponsive();
	const truncatedText =
		list?.text?.length > 50
			? ($isMobile ? list.text.substring(0, 80) : list.text.substring(0, 250)) +
			  '...'
			: list.text;

	const moveToTheDetailPage = (id: number) => {
		navigate(`/community/losts/lost/${id}`);
	};

	const isDefaultImage =
		list.images && list.images.length > 0
			? list.images[0].url
			: '/assets/LOGO.svg';

	return (
		<LostLi
			onClick={() => moveToTheDetailPage(list.boardId)}
			$isMobile={$isMobile}>
			<ImgWrap>
				<img
					src={isDefaultImage}
					className={
						isDefaultImage === '/assets/LOGO.svg' ? 'default-image' : ''
					}
				/>
			</ImgWrap>
			<TextWrap $isMobile={$isMobile} $isTablet={$isTablet}>
				<PlaceText $isMobile={$isMobile}>잃어버린 곳 : {list.place}</PlaceText>
				<DateText $isMobile={$isMobile}>
					잃어버린 날짜 : {formatDate(list.lostDate)}
				</DateText>
				<p>{truncatedText}</p>
			</TextWrap>
			<ButtonWrap $isMobile={$isMobile}>
				<Button $isMobile={$isMobile} $isTablet={$isTablet}>
					채팅하기
				</Button>
			</ButtonWrap>
		</LostLi>
	);
};

export default LostList;
