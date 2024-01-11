import { useParams } from 'react-router-dom';
import { useResponsive } from '../../../../hooks/useResponsive';
import Comment from '../../../Comment/Comment';
import RegisterCommentForm from '../../../Comment/RegisterCommentForm';
import DetailUserNav from '../../DetailUserNav/DetailUserNav';
import {
	CommentWrap,
	Paragraph,
	SubTitle,
	TextBox,
	Title,
} from './TipDetail.style';
import { getBoard } from '../../../../api/communityApi';
import { useQuery } from 'react-query';
import { BoardDetail } from '../../../../types/BoardTypes';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootUserState } from '../../../../slice/userSlice';

const TipDetail = () => {
	const [modifyPopUpClick, setModifyPopUpClick] = useState(false);
	const [modifyCommentId, setModifyCommentId] = useState(0);

	const isLoggedIn = useSelector(
		(state: RootUserState) => state.user.isLoggedIn,
	);

	const { $isMobile, $isTablet } = useResponsive();
	const { tipId } = useParams();

	const fetchGetDetailBoard = async (): Promise<BoardDetail> => {
		const response = await getBoard('tips', tipId);

		return response;
	};

	const { data, refetch } = useQuery<BoardDetail>(
		'tipDetailBoard',
		fetchGetDetailBoard,
	);

	return (
		<div>
			<Title $isMobile={$isMobile} $isTablet={$isTablet}>
				{data && data.title}
			</Title>
			<DetailUserNav />
			<TextBox $isMobile={$isMobile}>
				{data?.img && (
					<ul>
						{data.img.map((list) => (
							<li key={list.url}>
								<img src={list.url} alt="" />
							</li>
						))}
					</ul>
				)}
				<Paragraph $isMobile={$isMobile} $isTablet={$isTablet}>
					{data?.text}
				</Paragraph>
			</TextBox>
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

export default TipDetail;
