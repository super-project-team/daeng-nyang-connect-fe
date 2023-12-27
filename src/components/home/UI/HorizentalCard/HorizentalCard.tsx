import { useNavigate } from 'react-router-dom';
import { CardBtn } from '../VerticalCard/VerticalCard.style';
import {
	HorizentalCardImgDiv,
	HorizentalCardLi,
	HorizentalCardTextBox,
	HorizentalCardTextDesP,
	HorizentalCardTextDiv,
} from './HorizentalCard.style';

type HorizentalCardProps = {
	$isMobile?: boolean;
	review: {
		animalId: number;
		boardId: number;
		adoptedAnimalName: string;
		images: string[];
		textReview: string;
		age: number;
	};
};

const HorizentalCard = ({ $isMobile, review }: HorizentalCardProps) => {
	const navigate = useNavigate();

	const moveToDetailHandler = () => {
		navigate(`/adoptionReviews/review/${review.animalId}`);
	};

	return (
		<HorizentalCardLi $isMobile={$isMobile} onClick={moveToDetailHandler}>
			<HorizentalCardImgDiv>
				<img src={review.images[0]} alt="" />
			</HorizentalCardImgDiv>
			<HorizentalCardTextDiv>
				<HorizentalCardTextBox>
					<p style={{ fontSize: '400' }}>이름 : {review.adoptedAnimalName}</p>
					<HorizentalCardTextDesP>{review.textReview}</HorizentalCardTextDesP>
				</HorizentalCardTextBox>
				<CardBtn>자세히 보기</CardBtn>
			</HorizentalCardTextDiv>
		</HorizentalCardLi>
	);
};

export default HorizentalCard;
