import { useDispatch, useSelector } from 'react-redux';
import {
	CommunityState,
	SET_CATEGORY,
	SET_GENDER,
	SET_GET_ALL_BOARD,
	SET_INPUT_VALUE,
	SET_KIND_PET,
	SET_MODIFY_POPUP,
} from '../../../../slice/communitySlice';
import {
	ButtonWrap,
	CheckInput,
	ImageAndParagraphWrap,
	InfoWrap,
	InputWrap,
	LabelTitle,
	LabelWrap,
	ModalForm,
	StyledIoClose,
	TextInput,
	Title,
	TitleAndButtonWrap,
} from './WritingModalForm.style';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useResponsive } from '../../../../hooks/useResponsive';
import {
	getAllBoard,
	getBoard,
	getSize,
	modifyBoard,
	postBoard,
} from '../../../../api/communityApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Board, BoardDetail } from '../../../../types/BoardTypes';
import usePagination from '../../../../hooks/usePagination';
import { useQuery } from 'react-query';
import labelMappings from '../../../../utils/communityLabel';

interface RootState {
	community: CommunityState;
}

interface CommunityNavProps {
	setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FileMetadata {
	name: string;
	size: number;
	type: string;
	lastModified: number;
}

interface ComponentState {
	filesMetadata: FileMetadata[];
	selectedFiles: File[];
}

const WritingModalForm = ({ setIsPopUp }: CommunityNavProps) => {
	const [inputValue, setInputValue] = useState({
		place: '',
		lost_date: '',
		lost_time: '',
		breed: '',
		color: '',
		mobile: '',
		reward: 0,
		text: '',
		title: '',
		category: '',
		kind: '',
		gender: '',
	});
	const [state, setState] = useState<ComponentState>({
		filesMetadata: [],
		selectedFiles: [],
	});
	const [totalBoardSize, setTotalBoardSize] = useState(0);

	const params = useParams();
	const dispatch = useDispatch();
	const displayLabel = useSelector(
		(state: RootState) => state.community.displayLabel,
	);

	const mapping = displayLabel
		? labelMappings[displayLabel as keyof typeof labelMappings]
		: undefined;
	const boardType = mapping?.boardType;
	const idType = mapping?.idType;
	const id = mapping?.getId(params);
	const urlType = mapping?.urlType;

	const communityState = useSelector((state: RootState) => state.community);
	const isModifyPopUp = useSelector(
		(state: RootState) => state.community.isModifyPopUp,
	);

	const navigate = useNavigate();

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let updatedValue = value;

		if (name === 'reward' && parseInt(value, 10) < 0) {
			updatedValue = '0';
		}

		const updatedInputValue = { ...inputValue, [name]: updatedValue };

		setInputValue(updatedInputValue);
		dispatch(SET_INPUT_VALUE(updatedInputValue));
	};

	const textareaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const updatedInputValue = { ...inputValue, [name]: value };

		setInputValue(updatedInputValue);
		dispatch(SET_INPUT_VALUE(updatedInputValue));
	};

	const { $isMobile } = useResponsive();

	const radioChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		switch (name) {
			case 'petKind':
				setInputValue({ ...inputValue, kind: value });
				dispatch(SET_KIND_PET(value));
				break;
			case 'tip':
			case 'mate':
			case 'lost':
				setInputValue({ ...inputValue, category: value });
				dispatch(SET_CATEGORY(value));
				break;
			case 'gender':
				setInputValue({ ...inputValue, gender: value });
				dispatch(SET_GENDER(value));
				break;
			default:
				break;
		}
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesMetadata: FileMetadata[] = Array.from(e.target.files).map(
				(file) => ({
					name: file.name,
					size: file.size,
					type: file.type,
					lastModified: file.lastModified,
				}),
			);

			setState({
				filesMetadata,
				selectedFiles: Array.from(e.target.files),
			});
		}
	};

	const closeThePopUp = () => {
		setIsPopUp(false);
		dispatch(SET_MODIFY_POPUP(false));
		document.body.style.overflow = 'visible';
	};

	const fetchPostBoardHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		const postData = {
			...communityState,
			images: state.selectedFiles,
		};
		const response = await postBoard(boardType, postData);

		navigate(`/community/${urlType}`);

		dispatch(SET_GET_ALL_BOARD(data));
		refetch();
		setIsPopUp(false);
		document.body.style.overflow = 'visible';

		return response;
	};

	const fetchGetAllBoard = async (): Promise<Board[]> => {
		const response = await getAllBoard(
			boardType,
			displayLabel === '나의 댕냥이' || displayLabel === '댕냥 미아센터'
				? ''
				: String(currentPage),
		);

		return response;
	};

	const fetchGetAllBoardSize = async () => {
		const response = await getSize(boardType);

		setTotalBoardSize(response.size);

		return response.size;
	};

	const { data, refetch } = useQuery<Board[]>(
		displayLabel === '나의 댕냥이'
			? 'myPetAllBoard'
			: displayLabel === '댕냥 메이트'
			  ? 'mateAllBoard'
			  : displayLabel === '댕냥 꿀팁'
			    ? 'tipAllBoard'
			    : 'lostAllBoard',
		fetchGetAllBoard,
	);

	const itemsPerPage = displayLabel === '댕냥 꿀팁' ? 20 : 12;
	const { currentPage } = usePagination(totalBoardSize, itemsPerPage);

	const fetchGetDetailBoard = async (): Promise<BoardDetail> => {
		const response = await getBoard(boardType, id);

		return response;
	};

	const { data: detailData, refetch: detailRefetch } = useQuery<BoardDetail>(
		displayLabel === '나의 댕냥이'
			? 'myPetDetailBoard'
			: displayLabel === '댕냥 메이트'
			  ? 'mateDetailBoard'
			  : displayLabel === '댕냥 꿀팁'
			    ? 'tipDetailBoard'
			    : 'lostDetailBoard',
		fetchGetDetailBoard,
	);

	const fetchModifyDetailBoard = async () => {
		const postData = {
			...inputValue,
			images: state.selectedFiles,
		};

		const response = await modifyBoard(
			boardType,
			idType,
			detailData?.boardId,
			postData,
		);

		return response;
	};

	const modifyClickHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		await fetchModifyDetailBoard();
		setIsPopUp(false);
		dispatch(SET_MODIFY_POPUP(false));
		detailRefetch();
		document.body.style.overflow = 'visible';
	};

	useEffect(() => {
		fetchGetAllBoardSize();
	}, []);

	useEffect(() => {
		if (isModifyPopUp && detailData) {
			setInputValue({
				place: detailData?.place || '',
				lost_date: detailData.lostDate || '',
				lost_time: detailData.lostTime || '',
				breed: detailData.breed || '',
				color: detailData.color || '',
				mobile: detailData.mobile || '',
				reward: detailData.reward || 0,
				text: detailData.text || '',
				title: detailData.title || '',
				category: detailData.category || '',
				kind: detailData.kind || '',
				gender: detailData?.gender || '',
			});
		} else {
			setInputValue(inputValue);
		}
	}, [isModifyPopUp, detailData]);

	return (
		<ModalForm $isMobile={$isMobile}>
			<TitleAndButtonWrap>
				<Title>{displayLabel} 글쓰기</Title>
				<button onClick={closeThePopUp}>
					<StyledIoClose />
				</button>
			</TitleAndButtonWrap>
			<InfoWrap>
				{(displayLabel === '댕냥 꿀팁' ||
					displayLabel === '댕냥 메이트' ||
					displayLabel === '댕냥 미아센터') && (
					<LabelWrap>
						<LabelTitle htmlFor="category" $isMobile={$isMobile}>
							카테고리
						</LabelTitle>
						<InputWrap $isMobile={$isMobile}>
							<div>
								<label
									htmlFor={
										displayLabel === '댕냥 꿀팁'
											? 'item'
											: displayLabel === '댕냥 메이트'
											  ? 'mate'
											  : 'find'
									}>
									{displayLabel === '댕냥 꿀팁'
										? '용품 리뷰'
										: displayLabel === '댕냥 메이트'
										  ? '산책 메이트'
										  : '찾아주세요'}
								</label>
								<CheckInput
									type="radio"
									name={
										displayLabel === '댕냥 꿀팁'
											? 'tip'
											: displayLabel === '댕냥 메이트'
											  ? 'mate'
											  : 'lost'
									}
									value={
										displayLabel === '댕냥 꿀팁'
											? 'item'
											: displayLabel === '댕냥 메이트'
											  ? 'mate'
											  : 'find'
									}
									onChange={radioChangeHandler}
									checked={
										displayLabel === '댕냥 꿀팁'
											? inputValue.category === 'item'
											: displayLabel === '댕냥 메이트'
											  ? inputValue.category === 'mate'
											  : inputValue.category === 'find'
									}
								/>
							</div>
							<div>
								<label
									htmlFor={
										displayLabel === '댕냥 꿀팁'
											? 'center'
											: displayLabel === '댕냥 메이트'
											  ? 'care'
											  : 'found'
									}>
									{displayLabel === '댕냥 꿀팁'
										? '병원 리뷰'
										: displayLabel === '댕냥 메이트'
										  ? '맡아주실 분'
										  : '발견했어요'}
								</label>
								<CheckInput
									type="radio"
									name={
										displayLabel === '댕냥 꿀팁'
											? 'tip'
											: displayLabel === '댕냥 메이트'
											  ? 'mate'
											  : 'lost'
									}
									value={
										displayLabel === '댕냥 꿀팁'
											? 'center'
											: displayLabel === '댕냥 메이트'
											  ? 'care'
											  : 'found'
									}
									onChange={radioChangeHandler}
									checked={
										displayLabel === '댕냥 꿀팁'
											? inputValue.category === 'center'
											: displayLabel === '댕냥 메이트'
											  ? inputValue.category === 'care'
											  : inputValue.category === 'found'
									}
								/>
							</div>
							{displayLabel === '댕냥 꿀팁' && (
								<div>
									<label htmlFor="etc">그 외</label>
									<CheckInput
										type="radio"
										name="tip"
										value="etc"
										onChange={radioChangeHandler}
										checked={inputValue.category === 'etc'}
									/>
								</div>
							)}
						</InputWrap>
					</LabelWrap>
				)}
				{(displayLabel === '댕냥 메이트' ||
					displayLabel === '댕냥 미아센터') && (
					<LabelWrap>
						<LabelTitle htmlFor="place" $isMobile={$isMobile}>
							장소
						</LabelTitle>
						<TextInput
							type="text"
							name="place"
							value={inputValue.place}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="lost_date" $isMobile={$isMobile}>
							날짜
						</LabelTitle>
						<TextInput
							type="date"
							name="lost_date"
							value={inputValue.lost_date}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="lost_time" $isMobile={$isMobile}>
							시간
						</LabelTitle>
						<TextInput
							type="time"
							name="lost_time"
							value={inputValue.lost_time}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 꿀팁' && (
					<LabelWrap>
						<LabelTitle htmlFor="title" $isMobile={$isMobile}>
							제목
						</LabelTitle>
						<TextInput
							type="text"
							name="title"
							value={inputValue.title}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{(displayLabel === '나의 댕냥이' ||
					displayLabel === '댕냥 미아센터') && (
					<LabelWrap>
						<LabelTitle htmlFor="kind" $isMobile={$isMobile}>
							반려동물 종류
						</LabelTitle>
						<InputWrap $isMobile={$isMobile}>
							<div>
								<label htmlFor="dog">강아지</label>
								<CheckInput
									type="radio"
									name="petKind"
									value="dog"
									onChange={radioChangeHandler}
									checked={inputValue.kind === 'dog'}
								/>
							</div>
							<div>
								<label htmlFor="cat">고양이</label>
								<CheckInput
									type="radio"
									name="petKind"
									value="cat"
									onChange={radioChangeHandler}
									checked={inputValue.kind === 'cat'}
								/>
							</div>
							<div>
								<label htmlFor="etc">그 외</label>
								<CheckInput
									type="radio"
									name="petKind"
									value="etc"
									onChange={radioChangeHandler}
									checked={inputValue.kind === 'etc'}
								/>
							</div>
						</InputWrap>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="breed" $isMobile={$isMobile}>
							품종
						</LabelTitle>
						<TextInput
							type="text"
							name="breed"
							value={inputValue.breed}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="kind" $isMobile={$isMobile}>
							성별
						</LabelTitle>
						<InputWrap $isMobile={$isMobile}>
							<div>
								<label htmlFor="male">남자</label>
								<CheckInput
									type="radio"
									name="gender"
									value="male"
									onChange={radioChangeHandler}
									checked={inputValue.gender === 'male'}
								/>
							</div>
							<div>
								<label htmlFor="female">여자</label>
								<CheckInput
									type="radio"
									name="gender"
									value="female"
									onChange={radioChangeHandler}
									checked={inputValue.gender === 'female'}
								/>
							</div>
							<div>
								<label htmlFor="middle">중성</label>
								<CheckInput
									type="radio"
									name="gender"
									value="middle"
									onChange={radioChangeHandler}
									checked={inputValue.gender === 'middle'}
								/>
							</div>
						</InputWrap>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="color" $isMobile={$isMobile}>
							색깔
						</LabelTitle>
						<TextInput
							type="text"
							name="color"
							value={inputValue.color}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="mobile" $isMobile={$isMobile}>
							전화번호
						</LabelTitle>
						<TextInput
							type="tel"
							placeholder="000-0000-0000 형식으로 입력해주세요."
							name="mobile"
							value={inputValue.mobile}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="reward" $isMobile={$isMobile}>
							사례금
						</LabelTitle>
						<TextInput
							type="number"
							step="10000"
							name="reward"
							value={inputValue.reward}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				<LabelWrap>
					<LabelTitle htmlFor="text" $isMobile={$isMobile}>
						상세 설명
					</LabelTitle>
					<textarea
						name="text"
						id="text"
						value={inputValue.text}
						onChange={textareaChangeHandler}></textarea>
				</LabelWrap>
				{!isModifyPopUp && (
					<LabelWrap>
						<LabelTitle htmlFor="images" $isMobile={$isMobile}>
							이미지 등록
						</LabelTitle>
						<ImageAndParagraphWrap $isMobile={$isMobile}>
							<input type="file" multiple onChange={handleImageChange} />
						</ImageAndParagraphWrap>
					</LabelWrap>
				)}
			</InfoWrap>
			{!isModifyPopUp && (
				<ButtonWrap onClick={fetchPostBoardHandler}>
					<button>등록하기</button>
				</ButtonWrap>
			)}
			{isModifyPopUp && (
				<ButtonWrap onClick={modifyClickHandler}>
					<button>수정하기</button>
				</ButtonWrap>
			)}
		</ModalForm>
	);
};

export default WritingModalForm;
