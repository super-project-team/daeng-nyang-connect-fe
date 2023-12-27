import { useNavigate } from 'react-router-dom';
import { CategoryTitle } from '../../newFamily/NewFamily.style';
import { ReviewsContainer } from '../Reviews.style';
import ReviewList from './ReviewList';
import { useResponsive } from '../../../hooks/useResponsive';

const Reviews = () => {
	const navigate = useNavigate();

	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	return (
		<ReviewsContainer
			$isMobile={$isMobile}
			$isTablet={$isTablet}
			$isPc={$isPc}
			$isMaxWidth={$isMaxWidth}>
			<CategoryTitle
				$isMobile={$isMobile}
				$isTablet={$isTablet}
				$isPc={$isPc}
				$isMaxWidth={$isMaxWidth}>
				<h1>입양 후기</h1>
			</CategoryTitle>
			<ReviewList />
		</ReviewsContainer>
	);
};

export default Reviews;
