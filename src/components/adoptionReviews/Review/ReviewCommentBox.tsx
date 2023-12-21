import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	CommentBox,
	CommentContainer,
	CommentInputContainer,
	CommentList,
	CommentMoreUl,
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
	modifyComment,
	postComment,
} from '../../../api/reviewApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import formatDateDifferenceFromString from '../../../utils/fomatDateComment';
import { useSelector } from 'react-redux';
import { UserState } from '../../../slice/userSlice';
import LoginPopup from '../LoginPopup/LoginPopup';

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
}

const ReviewCommentBox = ({ reviewId }: CommentsProps) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const user = useSelector((state: UserState) => state);

	const [modify, setModify] = useState<{ [key: number]: boolean }>({});
	const [clickedLikeMark, setClickedLikeMark] = useState(false);
	const [commentText, setCommentText] = useState({
		comment: '',
	});
	const [commentMore, setCommentMore] = useState<{ [key: number]: boolean }>(
		{},
	);
	const [loginPopup, setLoginPopup] = useState(false);

	const { data: comments } = useQuery(['getAllComments', reviewId], () =>
		getAllComments(reviewId),
	);

	const clickLikeMarkHandler = () => {
		if (!user.isLoggedIn) {
			setLoginPopup((prev) => !prev);
		} else {
			setClickedLikeMark((prev) => !prev);
		}
	};

	const getLikeSize = () => {
		if ($isMobile) return 20;
		return 30;
	};

	const { mutate: commentsData } = useMutation(
		async () => {
			return postComment(reviewId, commentText);
		},
		{
			onSuccess: () => {
				setCommentText({ comment: '' });
				return queryClient.refetchQueries(['getAllComments', reviewId], {
					exact: true,
				});
			},
		},
	);

	const { mutate: deletedComments } = useMutation(
		async (reviewCommentId: number) => {
			return deleteComment(reviewCommentId);
		},
		{
			onSuccess: () => {
				return queryClient.refetchQueries(['getAllComments', reviewId], {
					exact: true,
				});
			},
		},
	);

	const { mutate: modifyComments } = useMutation(
		async (commentsId: number) => {
			return modifyComment(commentsId, commentText);
		},
		{
			onSuccess: () => {
				return queryClient.refetchQueries(['getAllComments', reviewId], {
					exact: true,
				});
			},
		},
	);

	const submitCommentHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		!user.isLoggedIn ? setLoginPopup((prev) => !prev) : commentsData();
	};

	const commentInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setCommentText({ comment: e.target.value });
	};

	const commentModifyHandler = (commentId: number) => {
		setModify((prev) => ({ [commentId]: !prev[commentId] }));
		setCommentMore((prev) => ({ [commentId]: !prev[commentId] }));
	};

	const modifyPutHandler = (commentsId: number) => {
		modifyComments(commentsId);
		setModify((prev) => ({
			[commentsId]: !prev[commentsId],
		}));
	};

	const deleteCommentHandler = (reviewCommentId: number) => {
		deletedComments(reviewCommentId);
	};

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
									<ModifyInputDiv>
										{modify[comment.commentsId] ? (
											<div style={{ width: '100%', borderRadius: '0' }}>
												<input
													defaultValue={comment.comment}
													onChange={commentInputChangeHandler}
												/>
												<ModifyBtnsBox>
													<button
														style={{ marginRight: '4px' }}
														onClick={() =>
															modifyPutHandler(comment.commentsId)
														}>
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
											<p>{comment.comment}</p>
										)}
									</ModifyInputDiv>
									<time>
										{formatDateDifferenceFromString(comment.createdAt)}
									</time>
									<span
										onClick={() =>
											setCommentMore((prev) => ({
												[comment.commentsId]: !prev[comment.commentsId],
											}))
										}>
										{user.isLoggedIn && <RiMore2Line className="more-icon" />}
									</span>
									{commentMore[comment.commentsId] && (
										<CommentMoreUl>
											<li
												onClick={() =>
													commentModifyHandler(comment.commentsId)
												}>
												수정
											</li>
											<li
												onClick={() =>
													deleteCommentHandler(comment.commentsId)
												}>
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
						<p>좋아요 213개</p>
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
