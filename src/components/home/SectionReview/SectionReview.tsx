import { MainSection, MainSectionH2 } from './../Section.style';
import HorizentalCard from '../UI/HorizentalCard/HorizentalCard';
import { SalmonBtn } from '../UI/SalmonBtn/SalmonBtn.style';
import { CardListUl } from './SectionReview.style';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../hooks/useResponsive';
import { useQuery } from 'react-query';
import { getReviews } from '../../../api/reviewApi';

interface ReviewData {
	animalId: number;
	boardId: number;
	adoptedAnimalName: string;
	images: string[];
	textReview: string;
	age: number;
}

const SectionReview = () => {
	const navigate = useNavigate();

	const { $isMaxWidth, $isMobile } = useResponsive();

	const moveToReview = () => {
		navigate('/adoptionReviews');
	};

	const { data: reviews } = useQuery<ReviewData[]>(['getReviews'], getReviews);

	return (
		<>
			{reviews ? (
				<MainSection $isMaxWidth={$isMaxWidth} $isMobile={$isMobile}>
					<MainSectionH2 $isMobile={$isMobile}>입양 후기</MainSectionH2>
					<CardListUl $isMobile={$isMobile}>
						{reviews.map((review, index) => (
							<HorizentalCard
								key={index}
								$isMobile={$isMobile}
								review={review}></HorizentalCard>
						))}
					</CardListUl>
					<SalmonBtn onClick={moveToReview} $isMobile={$isMobile}>
						더보기
					</SalmonBtn>
				</MainSection>
			) : (
				<MainSection $isMaxWidth={$isMaxWidth} $isMobile={$isMobile}>
					<MainSectionH2 $isMobile={$isMobile}>입양 후기</MainSectionH2>
					<CardListUl $isMobile={$isMobile}>
						<p>No reviews available</p>
					</CardListUl>
					<SalmonBtn onClick={moveToReview} $isMobile={$isMobile}>
						더보기
					</SalmonBtn>
				</MainSection>
			)}
		</>
	);
};

export default SectionReview;
