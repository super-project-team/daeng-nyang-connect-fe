import { useState } from 'react';
import {
	DetailImageBox,
	DetailTextBox,
	MoreDropdown,
	NewFamilyDetailContainer,
	UserThumbnail,
} from '../../newFamily/NewFamily.style';
import { RiMore2Line } from 'react-icons/ri';
import { DetailText, ReviewTextBox } from '../Reviews.style';
import ReviewCommentBox from './ReviewCommentBox';
import { useResponsive } from '../../../hooks/useResponsive';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteReview, getDetailReview } from '../../../api/reviewApi';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewModify from './ReviewModify';
import { useSelector } from 'react-redux';
import { UserState } from '../../../slice/userSlice';

const Review = () => {
	const params = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const animalId = Number(params.reviewId);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [isOpenModify, setIsOpenModify] = useState(false);
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const user = useSelector((state: UserState) => state);
	const { data: detailReview } = useQuery('getDetailReview', () =>
		getDetailReview(animalId),
	);
	const { mutate: deleteMutate } = useMutation(
		async (boardId: number) => {
			return deleteReview(boardId);
		},
		{
			onSuccess: () => {
				queryClient.refetchQueries(['getReviews'], { exact: true });
			},
		},
	);
	console.log(user.nickname);
	// console.log(detailReview[0].boardId);

	const toggleDropdown = () => {
		setIsDropdownVisible((prev) => !prev);
	};

	const getMoreBtnSize = () => {
		if ($isMobile) return 20;
		if ($isTablet) return 30;
		if ($isPc) return 30;
	};

	const modifyClickHandler = () => {
		setIsOpenModify((prev) => !prev);
		setIsDropdownVisible((prev) => !prev);
	};

	const deleteClickHandler = () => {
		const boardId = detailReview ? detailReview[0].boardId : null;
		if (boardId) deleteMutate(boardId);
		navigate('/adoptionReviews');
	};
	return (
		<>
			{detailReview && detailReview.length > 0 && (
				<NewFamilyDetailContainer
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}>
					<UserThumbnail
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						className="user-box-mobile">
						<div>
							<img src={detailReview[0].userThumbnail} alt="" />
						</div>
						<h5>{detailReview[0].nickname}</h5>
						{user.nickname === detailReview[0].nickname && (
							<RiMore2Line
								color="var(--color-light-salmon)"
								size={getMoreBtnSize()}
								onClick={toggleDropdown}
							/>
						)}
						{isDropdownVisible && (
							<MoreDropdown
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								<li onClick={modifyClickHandler}>수정하기</li>
								<li onClick={deleteClickHandler}>삭제하기</li>
							</MoreDropdown>
						)}
					</UserThumbnail>
					<DetailImageBox
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						<img src={detailReview[0].images[0]} alt="" />
					</DetailImageBox>
					<ReviewTextBox>
						<UserThumbnail
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							className="user-box-pc">
							<div>
								{detailReview?.length > 0 ? (
									<img src={detailReview[0].userThumbnail} alt="" />
								) : null}
							</div>
							<h5>{detailReview[0].nickname}</h5>
							{user.nickname === detailReview[0].nickname && (
								<RiMore2Line
									color="var(--color-light-salmon"
									size={30}
									onClick={toggleDropdown}
								/>
							)}
							{isDropdownVisible && (
								<MoreDropdown
									$isMobile={$isMobile}
									$isTablet={$isTablet}
									$isPc={$isPc}
									$isMaxWidth={$isMaxWidth}>
									<li onClick={modifyClickHandler}>수정하기</li>
									<li onClick={deleteClickHandler}>삭제하기</li>
								</MoreDropdown>
							)}
						</UserThumbnail>
						<DetailTextBox
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							{isOpenModify && (
								<ReviewModify
									setIsOpenModify={setIsOpenModify}
									adoptedAnimalName={detailReview[0].adoptedAnimalName}
									age={detailReview[0].age}
									reviewId={detailReview[0].boardId}
									images={detailReview[0].images}
								/>
							)}
							<p>이름 : {detailReview[0].adoptedAnimalName}</p>
							<p>나이 : {detailReview[0].age}</p>
							{/* <p>입양 시기: ??</p> */}
							<DetailText $isMobile={$isMobile}>
								{detailReview[0].textReview}
							</DetailText>
						</DetailTextBox>
						{<ReviewCommentBox reviewId={detailReview[0].boardId} />}
					</ReviewTextBox>
				</NewFamilyDetailContainer>
			)}
		</>
	);
};

export default Review;
