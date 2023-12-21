import { CiMenuKebab } from 'react-icons/ci';

import {
	ButtonWrap,
	CreatedAtText,
	DeletePopUpWrap,
	DetailUserWrap,
	InfoWrap,
	KebabWrap,
	LikeCount,
	LikeWrap,
	MenuButtonWrap,
	NicknameText,
	PopUpButtonWrap,
	PopUpInfoWrap,
	StyledFaHeart,
	SubInfoWrap,
	UserImageWrap,
	UserPageButtonWrap,
} from './DetailUserNav.style';
import { useDispatch, useSelector } from 'react-redux';
import {
	CommunityState,
	SET_MODIFY_POPUP,
	SET_MODIFY_VALUE,
} from '../../../slice/communitySlice';
import { deleteBoard, getBoard, likeBoard } from '../../../api/communityApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { BoardDetail } from '../../../types/BoardTypes';
import { useEffect, useState } from 'react';
import formatDate from '../../../utils/formatDate';
import { useResponsive } from '../../../hooks/useResponsive';
import labelMappings from '../../../utils/communityLabel';
import { RootUserState } from '../../../slice/userSlice';
import CheckLogin from '../CheckLogin/CheckLogin';
import { myPageGet } from '../../../api/authApi';

interface RootState {
	community: CommunityState;
}

const DetailUserNav = () => {
	const [userButtonClick, setUserButtonClick] = useState(false);
	const [menuButtonClick, setMenuButtonClick] = useState(false);
	const [deleteButtonClick, setDeleteButtonClick] = useState(false);
	const [isCheckLogin, setIsCheckLogin] = useState(false);

	const isLoggedIn = useSelector(
		(state: RootUserState) => state.user.isLoggedIn,
	);

	const communityState = useSelector((state: RootState) => state.community);
	console.log('communityState', communityState);

	const dispatch = useDispatch();

	const navigate = useNavigate();
	const currentUrl = window.location.origin;
	const domainAndPort = currentUrl.split('://')[1];

	const displayLabel = useSelector(
		(state: RootState) => state.community.displayLabel,
	);
	const params = useParams();
	const { $isMobile } = useResponsive();

	const mapping = displayLabel
		? labelMappings[displayLabel as keyof typeof labelMappings]
		: undefined;
	const boardType = mapping?.boardType;
	const idType = mapping?.idType;
	const id = mapping?.getId(params);
	const urlType = mapping?.urlType;

	const fetchGetDetailBoard = async (): Promise<BoardDetail> => {
		const response = await getBoard(boardType, id);

		return response;
	};

	const { data, refetch } = useQuery<BoardDetail>(
		displayLabel === '나의 댕냥이'
			? 'myPetDetailBoard'
			: displayLabel === '댕냥 꿀팁'
			  ? 'tipDetailBoard'
			  : displayLabel === '댕냥 메이트'
			    ? 'mateDetailBoard'
			    : 'lostDetailBoard',
		fetchGetDetailBoard,
	);

	console.log('data', data);

	const modifyBoardData = async () => {
		await refetch();
		await dispatch(SET_MODIFY_VALUE(data));
	};

	useEffect(() => {
		modifyBoardData();
	}, []);

	const fetchLikeBoard = async () => {
		const response = await likeBoard(boardType, idType, id);

		return response;
	};

	const handleLikeClick = async () => {
		if (isLoggedIn) {
			try {
				await fetchLikeBoard();
				refetch();
			} catch (error) {
				console.error('Error updating like status:', error);
			}
		} else {
			setIsCheckLogin(true);
		}
	};

	const userButtonClickHandler = () => {
		setUserButtonClick((prev) => !prev);
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

	const deleteClickHandler = async () => {
		setDeleteButtonClick(false);
		await fetchDeleteDetailBoard();
		refetch();
		navigate(`/community/${urlType}`);
		document.body.style.overflow = 'visible';
	};

	const ModifyPopUpClickHandler = () => {
		dispatch(SET_MODIFY_POPUP(true));
	};

	const moveToTheUserPage = () => {
		navigate('/users/3');
	};

	const fetchDeleteDetailBoard = async () => {
		const response = await deleteBoard(boardType, idType, id);

		return response;
	};

	const fetchMyPageData = async () => {
		const response = await myPageGet();
		console.log(response);

		return response;
	};

	const { data: myPageData } = useQuery('myPage', fetchMyPageData);

	const checkUser = myPageData?.nickname === data?.nickname;

	console.log('myPageData', myPageData);
	console.log(myPageData?.nickname === data?.nickname);

	return (
		<DetailUserWrap>
			<InfoWrap>
				<UserImageWrap onClick={userButtonClickHandler}>
					<img src={data?.userThumbnail} alt="" />
				</UserImageWrap>
				<div>
					<NicknameText $isMobile={$isMobile}>{data?.nickname}</NicknameText>
					<CreatedAtText $isMobile={$isMobile}>
						{formatDate(data?.createdAt)}
					</CreatedAtText>
				</div>
				{userButtonClick && (
					<UserPageButtonWrap onClick={moveToTheUserPage}>
						<button>유저 페이지</button>
					</UserPageButtonWrap>
				)}
			</InfoWrap>
			<SubInfoWrap>
				{displayLabel !== '댕냥 미아센터' && (
					<LikeWrap onClick={handleLikeClick} $isMobile={$isMobile}>
						<div>
							<StyledFaHeart />
						</div>
						<LikeCount $isMobile={$isMobile}>{data?.likes?.length}</LikeCount>{' '}
					</LikeWrap>
				)}
				{checkUser && isLoggedIn && (
					<KebabWrap onClick={menuButtonClickHandler}>
						<CiMenuKebab />
						{menuButtonClick && (
							<MenuButtonWrap>
								<ButtonWrap onClick={ModifyPopUpClickHandler}>
									<button>수정하기</button>
								</ButtonWrap>
								<ButtonWrap onClick={deleteButtonClickHandler}>
									<button>삭제하기</button>
								</ButtonWrap>
							</MenuButtonWrap>
						)}
					</KebabWrap>
				)}
			</SubInfoWrap>
			{deleteButtonClick && (
				<DeletePopUpWrap $isMobile={$isMobile}>
					<PopUpInfoWrap>
						<div>{domainAndPort} 내용:</div>
						<div>게시글을 삭제하시겠습니까?</div>
					</PopUpInfoWrap>
					<PopUpButtonWrap>
						<div>
							<button onClick={deletePopUpCancelHandler}>취소</button>
							<button onClick={deleteClickHandler}>확인</button>
						</div>
					</PopUpButtonWrap>
				</DeletePopUpWrap>
			)}
			{isCheckLogin && <CheckLogin setIsCheckLogin={setIsCheckLogin} />}
		</DetailUserWrap>
	);
};

export default DetailUserNav;
