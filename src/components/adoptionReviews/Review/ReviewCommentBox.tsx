import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	CommentBox,
	CommentContainer,
	CommentInputContainer,
	CommentList,
	CommentMoreUl,
	CommentP,
	LikeContainer,
	ModifyBtnsBox,
	ModifyInputDiv,
} from '../Reviews.style';
import { GoHeartFill } from 'react-icons/go';
import { RiMore2Line } from 'react-icons/ri';
import { useResponsive } from '../../../hooks/useResponsive';
import { useNavigate, useParams } from 'react-router-dom';
import {
	deleteComment,
	getAllComments,
	likeReview,
	modifyComment,
	postComment,
} from '../../../api/reviewApi';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import formatDateDifferenceFromString from '../../../utils/fomatDateComment';
import { useSelector } from 'react-redux';
import { UserState } from '../../../slice/userSlice';
import LoginPopup from '../LoginPopup/LoginPopup';
import { getUserLikes } from '../../../api/myPageApi';

interface Comments {
	commentsId: number;
	nickname: string;
	adoptedAnimalName: string;
	textReivew: string;
	comment: string;
	createdAt: string;
	userThumbnail: string;
}
interface CommentsProps {
	reviewId: number;
	reviewLike: number;
}

interface LikedItems {
	boardId: number;
	boardName: string;
}

const ReviewCommentBox = ({ reviewId, reviewLike }: CommentsProps) => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const queryClient = useQueryClient();
	const user = useSelector((state: any) => state.user);

	const [modify, setModify] = useState<{ [key: number]: boolean }>({});
	const [clickedLikeMark, setClickedLikeMark] = useState(false);
	const [commentText, setCommentText] = useState({
		comment: '',
	});
	const [modifyCommentText, setModifyCommentText] = useState('');
	const [commentMore, setCommentMore] = useState<{ [key: number]: boolean }>(
		{},
	);
	const [loginPopup, setLoginPopup] = useState(false);

	const [allComments, userLikes] = useQueries([
		{
			queryKey: ['getAllComments', reviewId],
			queryFn: () => getAllComments(reviewId),
		},
		{ queryKey: 'getUserLikes', queryFn: getUserLikes },
	]);
	const comments = allComments.data;
	const reviewLikes = userLikes.data?.filter(
		(item: any) => item.boardName === 'Review',
	);

	const { mutate: modifyCommentMutate } = useMutation(
		async (commentsId: number) => {
			return modifyComment(commentsId, modifyCommentText);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['getAllComments', reviewId], {
					exact: true,
				});
			},
		},
	);

	const clickLikeMarkHandler = async () => {
		if (!user.isLoggedIn) {
			setLoginPopup((prev) => !prev);
		} else {
			await likeReview(reviewId);
			userLikes.refetch();
		}
	};

	const getLikeSize = () => {
		if ($isMobile) return 20;
		return 30;
	};

	const submitCommentHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user.isLoggedIn) {
			setLoginPopup((prev) => !prev);
		} else {
			await postComment(reviewId, commentText);
			allComments.refetch();
		}
		setCommentText({ comment: '' });
	};

	const commentInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setCommentText({ comment: e.target.value });
	};

	const commentModifyChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setModifyCommentText(e.target.value);
	};

	const commentModifyHandler = (commentId: number) => {
		setModify((prev) => ({ [commentId]: !prev[commentId] }));
		setCommentMore((prev) => ({ [commentId]: !prev[commentId] }));
	};

	const modifyPutHandler = (commentsId: number) => {
		modifyCommentMutate(commentsId);
		setModify((prev) => ({
			[commentsId]: !prev[commentsId],
		}));
	};

	const deleteCommentHandler = async (reviewCommentId: number) => {
		await deleteComment(reviewCommentId);
		allComments.refetch();
	};

	useEffect(() => {
		if (reviewLikes)
			reviewLikes.some((item: any) => item.boardId === reviewId)
				? setClickedLikeMark(true)
				: setClickedLikeMark(false);
	}, [reviewLikes, userLikes]);

	return (
		<>
			{loginPopup && <LoginPopup setLoginPopup={setLoginPopup} />}
			<CommentContainer>
				<div>
					<CommentList
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						{comments && comments.length > 0 ? (
							comments.map((comment: Comments, index) => (
								<CommentBox
									key={index}
									$isMobile={$isMobile}
									$isTablet={$isTablet}
									$isPc={$isPc}
									$isMaxWidth={$isMaxWidth}>
									<div>
										<img src={comment.userThumbnail} alt="" />
									</div>
									<h5>{comment.nickname}</h5>
									<ModifyInputDiv $isMobile={$isMobile}>
										{modify[comment.commentsId] ? (
											<div style={{ width: '100%', borderRadius: '0' }}>
												<input
													defaultValue={comment.comment}
													onChange={commentModifyChangeHandler}
												/>
												<ModifyBtnsBox $isMobile={$isMobile}>
													<button
														style={{ marginRight: '4px' }}
														onClick={async () => {
															modifyPutHandler(comment.commentsId);
															allComments.refetch();
														}}>
														전송
													</button>
													<button
														onClick={() =>
															setModify((prev) => ({
																[comment.commentsId]: !prev[comment.commentsId],
															}))
														}>
														취소
													</button>
												</ModifyBtnsBox>
											</div>
										) : (
											<CommentP $isMobile={$isMobile}>
												<p>{comment.comment}</p>
												<time>
													{formatDateDifferenceFromString(comment.createdAt)}
												</time>
											</CommentP>
										)}
									</ModifyInputDiv>
									<span
										onClick={() =>
											setCommentMore((prev) => ({
												[comment.commentsId]: !prev[comment.commentsId],
											}))
										}>
										{user.isLoggedIn && comment.nickname == user.nickname && (
											<RiMore2Line className="more-icon" />
										)}
									</span>
									{commentMore[comment.commentsId] && (
										<CommentMoreUl>
											<li
												onClick={() => {
													commentModifyHandler(comment.commentsId);
												}}>
												수정
											</li>
											<li
												onClick={() => {
													deleteCommentHandler(comment.commentsId);
												}}>
												삭제
											</li>
										</CommentMoreUl>
									)}
								</CommentBox>
							))
						) : (
							<p style={{ color: 'var(--color-light-blue)' }}>
								첫 댓글을 달아보세요!
							</p>
						)}
					</CommentList>
					<LikeContainer
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						<GoHeartFill
							color={
								clickedLikeMark
									? 'var(--color-light-salmon)'
									: 'var(--color-light-blue'
							}
							size={getLikeSize()}
							onClick={clickLikeMarkHandler}
						/>
						<p>좋아요 {reviewLike}개</p>
					</LikeContainer>
				</div>
				<CommentInputContainer
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}
					onSubmit={submitCommentHandler}>
					<input
						type="text"
						name="comment"
						id=""
						value={commentText.comment}
						placeholder="댓글달기"
						onChange={commentInputChangeHandler}
					/>
					<button type="submit" className="comment-btn">
						게시
					</button>
				</CommentInputContainer>
			</CommentContainer>
		</>
	);
};

export default ReviewCommentBox;
