import { CiMenuKebab } from 'react-icons/ci';
import {
	ButtonWrap,
	CommentLi,
	CommentWrap,
	DeletePopUpWrap,
	InfoWrap,
	KebabWrap,
	MenuButtonWrap,
	PopUpButtonWrap,
	PopUpInfoWrap,
	TextWrap,
	UserImageWrap,
	UserPageButtonWrap,
} from './Comment.style';
import { useResponsive } from '../../hooks/useResponsive';
import { BoardComment, RootState } from '../../types/BoardTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteComment } from '../../api/communityApi';
import { useSelector } from 'react-redux';
import labelMappings from '../../utils/communityLabel';
import ModifyCommentForm from './ModifyCommentForm';
import { RootUserState } from '../../slice/userSlice';

interface CommentFormProps {
	list: BoardComment;
	modifyCommentId: number;
	modifyPopUpClick: boolean;
	setModifyCommentId: React.Dispatch<React.SetStateAction<number>>;
	setModifyPopUpClick: React.Dispatch<React.SetStateAction<boolean>>;
	refetch: () => void;
}

const Comment = ({
	list,
	modifyCommentId,
	modifyPopUpClick,
	setModifyCommentId,
	setModifyPopUpClick,
	refetch,
}: CommentFormProps) => {
	const [userButtonClick, setUserButtonClick] = useState(false);
	const [menuButtonClick, setMenuButtonClick] = useState(false);
	const [deleteButtonClick, setDeleteButtonClick] = useState(false);

	const isLoggedIn = useSelector(
		(state: RootUserState) => state.user.isLoggedIn,
	);

	const navigate = useNavigate();
	const currentUrl = window.location.origin;
	const domainAndPort = currentUrl.split('://')[1];

	const { $isTablet, $isMobile } = useResponsive();

	const displayLabel = useSelector(
		(state: RootState) => state.community.displayLabel,
	);

	const mapping = displayLabel
		? labelMappings[displayLabel as keyof typeof labelMappings]
		: undefined;
	const boardType = mapping?.boardType;
	const id = list.commentsId;

	const fetchDeleteComment = async () => {
		const response = await deleteComment(boardType, id);

		console.log(response);

		return response;
	};

	const userButtonClickHandler = () => {
		setUserButtonClick((prev) => !prev);
		console.log(userButtonClick);
	};

	const menuButtonClickHandler = () => {
		setMenuButtonClick((prev) => !prev);
	};

	const deleteButtonClickHandler = () => {
		setDeleteButtonClick((prev) => !prev);
		document.body.style.overflow = 'hidden';
	};

	const deletePopUpCancelHandler = () => {
		setDeleteButtonClick(false);
		document.body.style.overflow = 'visible';
	};

	const modifyPopUpClickHandler = () => {
		setModifyCommentId(list.commentsId);
		setModifyPopUpClick((prev) => !prev);
	};

	const deleteClickHandler = async () => {
		setDeleteButtonClick(false);
		await fetchDeleteComment();
		refetch();
		document.body.style.overflow = 'visible';
	};

	const moveToTheUserPage = () => {
		navigate('/users/3');
	};

	return (
		<CommentWrap>
			<CommentLi>
				<InfoWrap>
					<UserImageWrap
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						onClick={userButtonClickHandler}>
						<img src={list.userThumbnail} alt="" />
					</UserImageWrap>
					<TextWrap $isMobile={$isMobile} $isTablet={$isTablet}>
						<div>{list.nickname}</div>
						<div>{list.comment}</div>
						<div>{list.createdAt}</div>
					</TextWrap>
					{userButtonClick && (
						<UserPageButtonWrap onClick={moveToTheUserPage}>
							<button>유저 페이지</button>
						</UserPageButtonWrap>
					)}
				</InfoWrap>
				{isLoggedIn && (
					<KebabWrap onClick={menuButtonClickHandler}>
						<CiMenuKebab />
						{menuButtonClick && (
							<MenuButtonWrap>
								<ButtonWrap>
									<button onClick={modifyPopUpClickHandler}>수정하기</button>
								</ButtonWrap>
								<ButtonWrap onClick={deleteButtonClickHandler}>
									<button>삭제하기</button>
								</ButtonWrap>
							</MenuButtonWrap>
						)}
					</KebabWrap>
				)}
				{deleteButtonClick && (
					<DeletePopUpWrap $isMobile={$isMobile}>
						<PopUpInfoWrap>
							<div>{domainAndPort} 내용:</div>
							<div>댓글을 삭제하시겠습니까?</div>
						</PopUpInfoWrap>
						<PopUpButtonWrap>
							<div>
								<button onClick={deletePopUpCancelHandler}>취소</button>
								<button onClick={deleteClickHandler}>확인</button>
							</div>
						</PopUpButtonWrap>
					</DeletePopUpWrap>
				)}
			</CommentLi>
			{modifyCommentId === list.commentsId && modifyPopUpClick && (
				<ModifyCommentForm
					list={list}
					refetch={refetch}
					modifyPopUpClick={modifyPopUpClick}
					setModifyPopUpClick={setModifyPopUpClick}
					setModifyCommentId={setModifyCommentId}
				/>
			)}
		</CommentWrap>
	);
};

export default Comment;
