import { ChangeEvent, useEffect, useState } from 'react';
import { getAllComments, modifyReview } from '../../../api/reviewApi';
import { useResponsive } from '../../../hooks/useResponsive';
import { DetailTextBox } from '../../newFamily/NewFamily.style';
import { ModifyBtnsDiv, ModifyDiv } from '../Reviews.style';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface FormData {
	textReview: string;
}

const ReviewModify = ({
	setIsOpenModify,
	adoptedAnimalName,
	age,
	reviewId,
	images,
	refetch,
}: any) => {
	const queryClient = useQueryClient();
	const { $isMobile, $isTablet, $isPc } = useResponsive();
	const [modifyText, setModifyText] = useState('');

	const textChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setModifyText(e.target.value);
	};

	const modifyReviewHandler = async () => {
		const response = await modifyReview(reviewId, modifyText);
		console.log(response);
		refetch();
		setIsOpenModify((prev: boolean) => !prev);
	};

	return (
		<ModifyDiv $isTablet={$isTablet} $isMobile={$isMobile} $isPc={$isPc}>
			<p>이름 : {adoptedAnimalName}</p>
			<p>나이 : {age}</p>
			{/* <p>입양 시기: ??</p> */}
			<textarea onChange={textChangeHandler}></textarea>
			<ModifyBtnsDiv $isMobile={$isMobile}>
				<button onClick={() => setIsOpenModify((prev: boolean) => !prev)}>
					취소
				</button>
				<button onClick={modifyReviewHandler}>저장</button>
			</ModifyBtnsDiv>
		</ModifyDiv>
	);
};

export default ReviewModify;
