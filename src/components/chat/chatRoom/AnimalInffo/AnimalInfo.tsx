import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../../hooks/useResponsive';
import {
	AnimalInfoDiv,
	AnimalInfoImgDiv,
	AnimalInfoTextDiv,
	BtnDiv,
	CompleteBtn,
} from './AnimalInfo.style';
import { useSelector } from 'react-redux';
import { adoptComplete } from '../../../../api/newFamilyApi';
import { useState } from 'react';

interface CompleteResponse {
	status: number;
}
export interface ChatAnimalInfo {
	animalId: number;
	animalName: string;
	age: string;
	breed: string;
	images: string[];
}

const AnimalInfo = () => {
	const [isCompleted, setIsCompleted] = useState(false);
	const { $isMobile } = useResponsive();
	const navigate = useNavigate();

	const chatAnimalState = useSelector((state: any) => state.chat.chatAnimals);
	console.log(chatAnimalState);
	const reviewBtnHandler = () => {
		const animalId = chatAnimalState[1].animalId;
		navigate(`/adoptionReviews/reviewForm/${animalId}`);
	};
	const adoptCompleteHandler = async () => {
		const animalId = chatAnimalState[1].animalId;
		const adoptUserId = 39;

		try {
			const complete: any = await adoptComplete(animalId, adoptUserId);
			if (complete) {
				setIsCompleted(true);
			}
		} catch (error) {
			console.error('Error in adoptCompleteHandler:', error);
			setIsCompleted(false);
		}
	};

	return (
		<AnimalInfoDiv $isMobile={$isMobile}>
			<AnimalInfoImgDiv $isMobile={$isMobile}>
				<img src="/assets/community2.jpg" alt="" />
			</AnimalInfoImgDiv>
			<AnimalInfoTextDiv>
				<p>이름: {chatAnimalState.animalName}</p>
				<p>나이: 1년 3개월</p>
				<p>품종: 강아지 말티즈</p>
			</AnimalInfoTextDiv>
			<BtnDiv>
				{!isCompleted ? (
					<CompleteBtn $isMobile={$isMobile} onClick={reviewBtnHandler}>
						후기 쓰기
					</CompleteBtn>
				) : (
					<CompleteBtn $isMobile={$isMobile} onClick={adoptCompleteHandler}>
						입양 신청
					</CompleteBtn>
				)}
			</BtnDiv>
		</AnimalInfoDiv>
	);
};

export default AnimalInfo;
