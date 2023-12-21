import { useSelector } from 'react-redux';
import { CommunityState } from '../../slice/communitySlice';
import {
	ButtonWrap,
	Form,
	NickNameText,
	TextArea,
} from './RegisterCommentForm.style';
import { getBoard, postComment } from '../../api/communityApi';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { BoardDetail } from '../../types/BoardTypes';
import { useQuery } from 'react-query';
import labelMappings from '../../utils/communityLabel';
import { useResponsive } from '../../hooks/useResponsive';
import { myPageGet } from '../../api/authApi';

interface RootState {
	community: CommunityState;
}

const RegisterCommentForm = () => {
	const [text, setText] = useState<string>('');
	const displayLabel = useSelector(
		(state: RootState) => state.community.displayLabel,
	);

	const { $isMobile } = useResponsive();

	const params = useParams();
	const mapping = displayLabel
		? labelMappings[displayLabel as keyof typeof labelMappings]
		: undefined;
	const boardType = mapping?.boardType;
	const id = mapping?.getId(params);

	const textAreaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	const fetchPostComment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const response = await postComment(boardType, id, text);

		refetch();
		setText('');

		return response;
	};

	const fetchGetDetailBoard = async (): Promise<BoardDetail> => {
		const response = await getBoard(boardType, id);

		return response;
	};

	const { data, refetch } = useQuery(
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

	const fetchMyPageData = async () => {
		const response = await myPageGet();
		console.log(response);

		return response;
	};

	const { data: myPageData } = useQuery('myPage', fetchMyPageData);

	// console.log('myPageData', myPageData);

	return (
		<Form onSubmit={fetchPostComment}>
			<NickNameText $isMobile={$isMobile}>
				{myPageData ? myPageData?.nickname : '댕냥 커넥트'}
			</NickNameText>
			<TextArea
				placeholder="댓글쓰기"
				value={text}
				onChange={textAreaChangeHandler}
			/>
			<ButtonWrap $isMobile={$isMobile}>
				<button type="submit">등록</button>
			</ButtonWrap>
		</Form>
	);
};

export default RegisterCommentForm;
