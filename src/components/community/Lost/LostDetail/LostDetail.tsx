import { useParams } from 'react-router-dom';
import { getBoard } from '../../../../api/communityApi';
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
	Text,
	SubTitle,
	TextBox,
	DescriptionSpan,
} from './LostDetail.style';
import { useQuery } from 'react-query';
import { useState } from 'react';
import formatDate from '../../../../utils/formatDate';
import formatTime from '../../../../utils/formatTime';

const LostDetail = () => {
	const [modifyPopUpClick, setModifyPopUpClick] = useState(false);
	const [modifyCommentId, setModifyCommentId] = useState(0);

	const { $isTablet, $isMobile } = useResponsive();

	const { lostId } = useParams();

	const fetchGetDetailBoard = async () => {
		const response = await getBoard('lost', lostId);

		return response;
	};

	const { data, refetch } = useQuery('lostDetailBoard', fetchGetDetailBoard);

	return (
		<div>
			<DetailUserNav />
			<ImageAndTextWrap $isMobile={$isMobile} $isTablet={$isTablet}>
				<ImageWrap $isMobile={$isMobile} $isTablet={$isTablet}>
					<CommunitySwiper images={data?.images} />
				</ImageWrap>
				<TextBox $isMobile={$isMobile} $isTablet={$isTablet}>
					<SubTitle>잃어버린 가족을 찾아주세요!</SubTitle>
					<div>
						<Description $isMobile={$isMobile} $isTablet={$isTablet}>
							잃어버린 지역
						</Description>
						<Text $isMobile={$isMobile} $isTablet={$isTablet}>
							{data?.place}
						</Text>
					</div>
					<div>
						<Description $isMobile={$isMobile} $isTablet={$isTablet}>
							잃어버린 날짜
						</Description>
						<Text $isMobile={$isMobile} $isTablet={$isTablet}>
							{formatDate(data?.lostDate)}
						</Text>
					</div>
					<div>
						<Description $isMobile={$isMobile} $isTablet={$isTablet}>
							잃어버린 시간
						</Description>
						<Text $isMobile={$isMobile} $isTablet={$isTablet}>
							{formatTime(data?.lostTime)}
						</Text>
					</div>
					<div>
						<Description $isMobile={$isMobile} $isTablet={$isTablet}>
							사례금
						</Description>
						<Text $isMobile={$isMobile} $isTablet={$isTablet}>
							{Number(data?.reward)?.toLocaleString()}
						</Text>
					</div>
					<div>
						<Description $isMobile={$isMobile} $isTablet={$isTablet}>
							전화번호
						</Description>
						<Text $isMobile={$isMobile} $isTablet={$isTablet}>
							{data?.mobile}
						</Text>
					</div>
					<div>
						<Description $isMobile={$isMobile} $isTablet={$isTablet}>
							종류 및 품종
						</Description>
						<Text $isMobile={$isMobile} $isTablet={$isTablet}>
							<div>
								{data?.kind === 'dog'
									? '강아지'
									: data?.kind === 'cat'
									  ? '고양이'
									  : '기타 반려동물'}
							</div>
							<div>, </div>
							<div>{data?.breed}</div>
						</Text>
					</div>
					<div>
						<Description $isMobile={$isMobile} $isTablet={$isTablet}>
							성별
						</Description>
						<Text $isMobile={$isMobile} $isTablet={$isTablet}>
							{data?.gender === 'mail'
								? '남자'
								: data?.gender === 'female'
								  ? '여자'
								  : '중성'}
						</Text>
					</div>
					<div>
						<Description $isMobile={$isMobile} $isTablet={$isTablet}>
							색깔
						</Description>
						<Text $isMobile={$isMobile} $isTablet={$isTablet}>
							{data?.color}
						</Text>
					</div>
					<DescriptionSpan $isMobile={$isMobile} $isTablet={$isTablet}>
						상세 설명
					</DescriptionSpan>
					<p>{data?.text}</p>
				</TextBox>
			</ImageAndTextWrap>
			<CommentWrap $isMobile={$isMobile}>
				<SubTitle>댓글</SubTitle>
				<ul>
					{data?.comments?.map((list) => (
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
				{modifyCommentId === 0 && <RegisterCommentForm />}
			</CommentWrap>
		</div>
	);
};

export default LostDetail;
