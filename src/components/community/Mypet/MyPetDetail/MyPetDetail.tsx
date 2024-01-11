import { useParams } from 'react-router-dom';
import { useResponsive } from '../../../../hooks/useResponsive';
import Comment from '../../../Comment/Comment';
import RegisterCommentForm from '../../../Comment/RegisterCommentForm';
import CommunitySwiper from '../../CommunitySwiper/CommunitySwiper';
import DetailUserNav from '../../DetailUserNav/DetailUserNav';
import {
	CommentWrap,
	Description,
	ImageAndTextWrap,
	ImageWrap,
	SubTitle,
	TextBox,
} from './MyPetDetail.style';
import { getBoard } from '../../../../api/communityApi';
import { useQuery } from 'react-query';
import { BoardDetail } from '../../../../types/BoardTypes';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootUserState } from '../../../../slice/userSlice';

const MyPetDetail = () => {
	const [modifyPopUpClick, setModifyPopUpClick] = useState(false);
	const [modifyCommentId, setModifyCommentId] = useState(0);

	const isLoggedIn = useSelector(
		(state: RootUserState) => state.user.isLoggedIn,
	);

	const { $isTablet, $isMobile } = useResponsive();
	const { myPetId } = useParams();

	const fetchGetDetailBoard = async (): Promise<BoardDetail> => {
		const response = await getBoard('my_pet', myPetId);

		return response;
	};

	const { data, refetch } = useQuery('myPetDetailBoard', fetchGetDetailBoard);

	return (
		<div>
			<DetailUserNav />
			<ImageAndTextWrap $isMobile={$isMobile} $isTablet={$isTablet}>
				<ImageWrap $isMobile={$isMobile} $isTablet={$isTablet}>
					<CommunitySwiper images={data?.img} />
				</ImageWrap>
				<TextBox $isMobile={$isMobile} $isTablet={$isTablet}>
					<h3>자랑하기</h3>
					<Description $isMobile={$isMobile} $isTablet={$isTablet}>
						상세 설명
					</Description>
					<p>{data?.text}</p>
				</TextBox>
			</ImageAndTextWrap>
			<CommentWrap $isMobile={$isMobile}>
				<SubTitle>댓글</SubTitle>
				<ul>
					{data &&
						data.comments?.map((list) => {
							if ('commentsId' in list) {
								return (
									<Comment
										key={list.commentsId}
										list={list}
										refetch={refetch}
										modifyCommentId={modifyCommentId}
										setModifyCommentId={setModifyCommentId}
										setModifyPopUpClick={setModifyPopUpClick}
										modifyPopUpClick={modifyPopUpClick}
									/>
								);
							}
						})}
				</ul>
				{modifyCommentId === 0 && isLoggedIn && <RegisterCommentForm />}
			</CommentWrap>
		</div>
	);
};

export default MyPetDetail;
