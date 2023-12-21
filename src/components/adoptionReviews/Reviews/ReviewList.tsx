import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import { ButtonBox, ReviewBox, ReviewsList } from '../Reviews.style';
import { useResponsive } from '../../../hooks/useResponsive';
import {
	QueryClient,
	useMutation,
	useQueries,
	useQuery,
	useQueryClient,
} from 'react-query';
import { getReviews, likeReview } from '../../../api/reviewApi';
import { useDispatch, useSelector } from 'react-redux';
import { PUSH_REVIEW_ITEM } from '../../../slice/reviewSlice';
import { getUserLikes } from '../../../api/myPageApi';
import { UserState } from '../../../slice/userSlice';
import LoginPopup from '../LoginPopup/LoginPopup';

interface ReviewItem {
	adoptedAnimalName: string;
	age: string;
	boardId: number;
	createdAt: string;
	images: string[];
	nickname: string;
	textReview: string;
	userThumbnail: string;
}

interface LikedItems {
	boardId: number;
	boardName: string;
}

const ReviewList = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const user = useSelector((state: UserState) => state);

	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const result = useQueries([
		{ queryKey: 'getReviews', queryFn: getReviews },
		{ queryKey: 'getUserLikes', queryFn: getUserLikes },
	]);
	const items = result[0].data;
	const userLikes = result[1].data;
	const reviewLikes =
		userLikes &&
		userLikes.filter((item: LikedItems) => item.boardName === 'Review');

	const [likeState, setLikeState] = useState<{ [key: number]: boolean }>({});
	const [loginPopup, setLoginPopup] = useState(false);

	useEffect(() => {
		if (reviewLikes) {
			const existingLikes = items?.filter((item) =>
				reviewLikes.some((like: any) => like.boardId === item.boardId),
			);
			existingLikes?.map((item) => setLikeState({ [item.boardId]: true }));
		}
	}, [userLikes]);

	const { mutate: setLike } = useMutation(
		async (itemId: number) => {
			return likeReview(itemId);
		},
		{
			onSuccess: () => {
				queryClient.refetchQueries(['getReviews'], { exact: true });
			},
		},
	);

	const clickLikeHandler = (itemId: number) => {
		if (!user.isLoggedIn) setLoginPopup((prev) => !prev);
		else {
			try {
				setLike(itemId);
				setLikeState((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
			} catch (err) {
				console.error(err);
			}
		}
	};

	const moveToReviewDetailHandler = (animalId: number) => {
		navigate(`/adoptionReviews/review/${animalId}`);
	};
	return (
		<>
			{loginPopup && <LoginPopup setLoginPopup={setLoginPopup} />}
			<ReviewsList
				$isMobile={$isMobile}
				$isTablet={$isTablet}
				$isPc={$isPc}
				$isMaxWidth={$isMaxWidth}>
				{items &&
					items.map((item) => (
						<ReviewBox
							key={item.boardId}
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							onClick={() => moveToReviewDetailHandler(item.animalId)}>
							<div>
								<img src={item.images[0]} alt="" />
							</div>
							<div>
								<div>
									<p>이름 : {item.adoptedAnimalName}</p>
									<p>{item.textReview}</p>
								</div>
								<ButtonBox>
									<GoHeartFill
										color={
											likeState[item.boardId]
												? 'var(--color-light-salmon)'
												: 'var(--color-light-blue)'
										}
										size={30}
										onClick={(e) => {
											e.stopPropagation();
											clickLikeHandler(item.boardId);
										}}
									/>
									<button>자세히 보기</button>
								</ButtonBox>
							</div>
						</ReviewBox>
					))}
			</ReviewsList>
		</>
	);
};

export default ReviewList;
