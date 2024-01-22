import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getChatDetails } from '../../../../api/chatApi';
import { adoptComplete } from '../../../../api/newFamilyApi';
import { useResponsive } from '../../../../hooks/useResponsive';
import {
	AnimalInfoDiv,
	AnimalInfoImgDiv,
	AnimalInfoTextDiv,
	BtnDiv,
	CompleteBtn,
} from './AnimalInfo.style';

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
	const { roomId } = useParams();

	const { data: chatDetails, refetch } = useQuery('getChatDetails', () =>
		getChatDetails(Number(roomId)),
	);

	const animalId = useSelector(
		(state: any) => state.chat.chatAnimal.chatAnimalId,
	);
	const reviewBtnHandler = () => {
		navigate(`/adoptionReviews/reviewForm/${animalId}`);
	};

	useEffect(() => {
		refetch();
	}, [chatDetails]);

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
			{chatDetails && (
				<AnimalInfoDiv $isMobile={$isMobile}>
					<AnimalInfoImgDiv $isMobile={$isMobile}>
						<img src={chatDetails.animalImage} alt="" />
					</AnimalInfoImgDiv>
					<AnimalInfoTextDiv>
						<p>이름: {chatDetails.animalName}</p>
						<p>나이: {chatDetails.animalAge}</p>
						<p>품종: {chatDetails.breed}</p>
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
