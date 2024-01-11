import { CiUser } from 'react-icons/ci';
import {
	Button,
	ButtonWrap,
	MateLi,
	PlaceWrap,
	SubNav,
	TextWrap,
	UserWrap,
} from './MateList.style';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../../hooks/useResponsive';
import { Board } from '../../../../types/BoardTypes';

interface MateListProps {
	list: Board;
}

const MateList = ({ list }: MateListProps) => {
	const navigate = useNavigate();
	const { $isTablet, $isMobile } = useResponsive();

	const truncatedText =
		list?.text?.length > 50
			? ($isMobile ? list.text.substring(0, 70) : list.text.substring(0, 120)) +
			  ' ...'
			: list.text;

	const moveToTheDetailPage = (id: number) => {
		navigate(`/community/mates/mate/${id}`);
	};

	return (
		<MateLi $isMobile={$isMobile}>
			<SubNav>
				<UserWrap $isMobile={$isMobile} $isTablet={$isTablet}>
					<div>
						<CiUser />
					</div>
					<span>{list.nickname}</span>
				</UserWrap>
			</SubNav>
			<TextWrap
				onClick={() => moveToTheDetailPage(list.boardId)}
				$isMobile={$isMobile}
				$isTablet={$isTablet}>
				<PlaceWrap $isMobile={$isMobile} $isTablet={$isTablet}>
					지역 : {list.place}
				</PlaceWrap>
				<p>{truncatedText}</p>
			</TextWrap>
			<ButtonWrap>
				<Button $isMobile={$isMobile} $isTablet={$isTablet}>
					채팅하기
				</Button>
			</ButtonWrap>
		</MateLi>
	);
};

export default MateList;
