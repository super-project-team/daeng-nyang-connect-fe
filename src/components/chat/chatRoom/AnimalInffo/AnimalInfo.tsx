import { useNavigate, useParams } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import useCounterUser from '../../../../hooks/useCounterUser';

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

const AnimalInfo = ({ counterUser }: any) => {
	const [isCompleted, setIsCompleted] = useState(false);
	const { $isMobile } = useResponsive();
	const navigate = useNavigate();

	const chatAnimalState = useSelector((state: any) => state.chat.chatAnimal);
	const animalId = chatAnimalState.animalId;
	const reviewBtnHandler = () => {
		navigate(`/adoptionReviews/reviewForm/${animalId}`);
	};

	const adoptCompleteHandler = async () => {
		const adoptUserId = counterUser.userId;

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
		<>
			{chatAnimalState && (
				<AnimalInfoDiv $isMobile={$isMobile}>
					<AnimalInfoImgDiv $isMobile={$isMobile}>
						<img src={chatAnimalState.animalImage} alt="" />
					</AnimalInfoImgDiv>
					<AnimalInfoTextDiv>
						<p>이름: {chatAnimalState.animalName}</p>
						<p>나이: {chatAnimalState.animalAge}</p>
						<p>품종: {chatAnimalState.breed}</p>
					</AnimalInfoTextDiv>
					<BtnDiv>
						{isCompleted ? (
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
			)}
		</>
	);
};

export default AnimalInfo;
