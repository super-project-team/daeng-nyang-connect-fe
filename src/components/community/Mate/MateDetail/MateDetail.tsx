import DetailUserNav from '../../DetailUserNav/DetailUserNav';
import Comment from '../../../Comment/Comment';
import {
	CommentWrap,
	Description,
	ImageAndTextWrap,
	ImageWrap,
	Place,
	PlaceWrap,
	SubTitle,
	TextBox,
	Text,
} from './MateDetail.style';
import RegisterCommentForm from '../../../Comment/RegisterCommentForm';
import { useResponsive } from '../../../../hooks/useResponsive';
import CommunitySwiper from '../../CommunitySwiper/CommunitySwiper';
import { getBoard } from '../../../../api/communityApi';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootUserState } from '../../../../slice/userSlice';

const MateDetail = () => {
	const [modifyPopUpClick, setModifyPopUpClick] = useState(false);
	const [modifyCommentId, setModifyCommentId] = useState(0);

	const isLoggedIn = useSelector(
		(state: RootUserState) => state.user.isLoggedIn,
	);

	const { $isTablet, $isMobile } = useResponsive();

	const { mateId } = useParams();

	const fetchGetDetailMateBoard = async () => {
		const response = await getBoard('mate', mateId);

		return response;
	};

	const { data, refetch } = useQuery(
		'mateDetailBoard',
		fetchGetDetailMateBoard,
	);

	return (
		<div>
			<DetailUserNav />
			<ImageAndTextWrap $isMobile={$isMobile} $isTablet={$isTablet}>
				<ImageWrap $isMobile={$isMobile} $isTablet={$isTablet}>
					<CommunitySwiper images={data?.img} />
				</ImageWrap>
				<TextBox $isMobile={$isMobile} $isTablet={$isTablet}>
					<SubTitle>메이트 구하기</SubTitle>
					<PlaceWrap>
						<Description $isMobile={$isMobile} $isTablet={$isTablet}>
							지역
						</Description>
						<Place $isMobile={$isMobile} $isTablet={$isTablet}>
							{data?.place}
						</Place>
					</PlaceWrap>
					<Description $isMobile={$isMobile} $isTablet={$isTablet}>
						상세 설명
					</Description>
					<Text $isMobile={$isMobile} $isTablet={$isTablet}>
						{data?.text}
					</Text>
				</TextBox>
			</ImageAndTextWrap>
			<CommentWrap $isMobile={$isMobile}>
				<SubTitle>댓글</SubTitle>
				<ul>
					{data?.comments.map((list) => (
						<Comment
							key={list.commentsId}
							list={list}
							refetch={refetch}
							modifyCommentId={modifyCommentId}
							setModifyCommentId={setModifyCommentId}
							setModifyPopUpClick={setModifyPopUpClick}
							modifyPopUpClick={modifyPopUpClick}
						/>
					))}
				</ul>
				{modifyCommentId === 0 && isLoggedIn && <RegisterCommentForm />}
			</CommentWrap>
		</div>
	);
};

export default MateDetail;
