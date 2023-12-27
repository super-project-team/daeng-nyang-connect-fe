import { useState } from 'react';
import CommunityNav from '../../components/community/CommunityNav/CommunityNav';
import {
	ArrowButtonWrap,
	CommunitySection,
	StyledFaArrowUp,
} from './Community.style';
import BackDrop from '../../components/BackDrop/BackDrop';
import WritingModal from '../../components/community/WritingModal/WritingModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/BoardTypes';
import { useResponsive } from '../../hooks/useResponsive';
import Loading from '../Loading/Loading';

const Community = () => {
	const [isPopUp, setIsPopUp] = useState(false);
	const isModifyPopUp = useSelector(
		(state: RootState) => state.community.isModifyPopUp,
	);
	const displayLabel = useSelector(
		(state: RootState) => state.community.displayLabel,
	);

	const isLoading = useSelector(
		(state: RootState) => state.community.isLoading,
	);
	console.log('isLoading', isLoading);

	const { $isMobile } = useResponsive();

	const scrollToTopHandler = () => {
		const elementToScrollTo = document.body;

		elementToScrollTo.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			{(isPopUp || isModifyPopUp) && <BackDrop setIsPopUp={setIsPopUp} />}
			{(isPopUp || isModifyPopUp) && <WritingModal setIsPopUp={setIsPopUp} />}
			{isLoading && <Loading />}
			<CommunitySection>
				<CommunityNav setIsPopUp={setIsPopUp} isPopUp={isPopUp} />
				{(displayLabel === '나의 댕냥이' || displayLabel === '댕냥 미아센터') &&
					!$isMobile && (
						<ArrowButtonWrap onClick={scrollToTopHandler}>
							<StyledFaArrowUp />
						</ArrowButtonWrap>
					)}
			</CommunitySection>
		</>
	);
};

export default Community;
