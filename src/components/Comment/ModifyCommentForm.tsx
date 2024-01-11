import { useSelector } from 'react-redux';
import { CommunityState } from '../../slice/communitySlice';
import {
	ButtonContainer,
	ButtonWrap,
	Form,
	NickNameText,
	TextArea,
} from './ModifyCommentForm.style';
import { modifyComment } from '../../api/communityApi';
import { useState } from 'react';
import { BoardComment } from '../../types/BoardTypes';

import labelMappings from '../../utils/communityLabel';
import { useResponsive } from '../../hooks/useResponsive';
import { useQuery } from 'react-query';
import { myPageGet } from '../../api/myPageApi';

interface RootState {
	community: CommunityState;
}

interface CommentFormProps {
	list: BoardComment;
	modifyPopUpClick: boolean;
	setModifyPopUpClick: React.Dispatch<React.SetStateAction<boolean>>;
	setModifyCommentId: React.Dispatch<React.SetStateAction<number>>;
	refetch: () => void;
}

const ModifyCommentForm = ({
	list,
	modifyPopUpClick,
	setModifyPopUpClick,
	setModifyCommentId,
	refetch,
}: CommentFormProps) => {
	const [modifyText, setModifyText] = useState(list.comment);
	const [isTextAreaTouch, setIsTextAreaTouch] = useState(false);

	const { $isMobile } = useResponsive();

	const displayLabel = useSelector(
		(state: RootState) => state.community.displayLabel,
	);

	const textAreaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setModifyText(e.target.value);
	};

	const textAreaFocusHandler = () => {
		setIsTextAreaTouch(true);
	};

	const textAreaBlurHandler = () => {
		setIsTextAreaTouch(false);
	};

	const mapping = displayLabel
		? labelMappings[displayLabel as keyof typeof labelMappings]
		: undefined;
	const boardType = mapping?.boardType;

	const modifyCommentHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await modifyComment(
			boardType,
			list?.commentsId,
			modifyText,
		);

		refetch();
		setModifyPopUpClick(false);
		setModifyCommentId(0);

		return response;
	};

	const modifyPopUpCancelHandler = (e: React.FormEvent) => {
		e.preventDefault();
		setModifyPopUpClick(false);
		setModifyCommentId(0);
	};

	const fetchMyPageData = async () => {
		const response = await myPageGet();
		console.log(response);

		return response;
	};

	const { data: myPageData } = useQuery('myPage', fetchMyPageData);

	console.log('myPageData', myPageData);

	return (
		<Form onSubmit={modifyCommentHandler}>
			<NickNameText $isMobile={$isMobile}>
				{' '}
				{myPageData ? myPageData?.nickname : '댕냥 커넥트'}
			</NickNameText>
			<TextArea
				placeholder="댓글쓰기"
				value={modifyPopUpClick && !isTextAreaTouch ? list.comment : modifyText}
				onChange={textAreaChangeHandler}
				onFocus={textAreaFocusHandler}
				onBlur={textAreaBlurHandler}
			/>
			<ButtonContainer>
				<ButtonWrap onClick={modifyPopUpCancelHandler} $isMobile={$isMobile}>
					<button>취소</button>
				</ButtonWrap>
				<ButtonWrap $isMobile={$isMobile}>
					<button type="submit">수정</button>
				</ButtonWrap>
			</ButtonContainer>
		</Form>
	);
};

export default ModifyCommentForm;
