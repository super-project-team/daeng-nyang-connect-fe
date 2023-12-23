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
}: any) => {
	const queryClient = useQueryClient();
	const { $isMobile, $isTablet, $isPc } = useResponsive();
	const [formData, setFormData] = useState<FormData>({
		textReview: '',
	});

	const { data: comments, refetch } = useQuery(
		['getAllComments', reviewId],
		() => getAllComments(reviewId),
	);

	const { mutate: detailReview } = useMutation(
		async () => {
			return modifyReview(reviewId, formData);
		},
		{
			onSuccess: () => {
				queryClient.refetchQueries(['getDetailReview'], { exact: true });
			},
		},
	);

	useEffect(() => {
		setFormData((prev) => ({ ...prev, files: images }));
	}, []);
	const textChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ textReview: e.target.value });
	};

	const modifyReviewHandler = () => {
		detailReview();
		setIsOpenModify((prev: boolean) => !prev);
		refetch();
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
