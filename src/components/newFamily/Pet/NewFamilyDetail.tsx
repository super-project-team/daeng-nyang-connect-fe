import { BsBookmarkFill } from 'react-icons/bs';
import { RiMore2Line } from 'react-icons/ri';
import {
	CategoryTitle,
	DetailImageBox,
	DetailTextBox,
	FormText,
	ModifyAnimalInfo,
	MoreDropdown,
	NewFamilyDetailContainer,
	UserThumbnail,
} from '../NewFamily.style';
import { useNavigate } from 'react-router-dom';
import NewFamilySwiper from './NewFamilySwiper';
import { useEffect, useState } from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ANIMAL_ID } from '../../../slice/chatSlice';
import {
	deleteAnimal,
	getNewFamily,
	getScrappedAnimal,
	modifyAnimal,
	scrapAnimal,
} from '../../../api/newFamilyApi';
import { IoCloseOutline } from 'react-icons/io5';
import { PiPawPrintFill } from 'react-icons/pi';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import localToken from '../../../api/LocalToken';
import { makeChatRoom } from '../../../api/chatApi';

interface AnimalData {
	boardId: number;
	images: string[];
	city: string;
	gender: string;
	animalName: string;
	age: string;
	breed: string;
	disease: string;
	training: string;
	neutering: boolean;
	nurturePeriod: string;
	healthCheck: string;
	textReason: string;
	textEtc: string;
	adoptionStatus: string;
	nickname: string;
	userThumbnail: string;
	kind: string;
	files: never[];
}
interface UserState {
	user: { isLoggedIn: boolean; nickname: string; id: string };
}
const NewFamilyDetail = () => {
	const navigate = useNavigate();
	const [clickedBookmark, setClickedBookmark] = useState(false);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [isModifyMode, setIsModifyMode] = useState(false);
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const dispatch = useDispatch();
	const { petId } = useParams();
	const [formData, setFormData] = useState({
		animalName: '',
		kind: '',
		city: '',
		gender: '',
		breed: '',
		age: '',
		disease: '',
		training: '',
		neutering: '',
		healthCheck: '',
		nurturePeriod: null,
		files: [],
		textReason: '',
		textEtc: '',
	});

	const [boardIdData, setBoardIdData] = useState<AnimalData | null>(null);
	const [bookmarkState, setBookmarkState] = useState<{
		[key: number]: boolean;
	}>({});
	const user = useSelector((state: UserState) => state.user);
	const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

	//디테일정보불러오기(해당하는 item만)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getNewFamily();
				const parsedBoardId = petId ? parseInt(petId) : undefined;
				const boardData = response.find(
					(animal: AnimalData) => animal.boardId === parsedBoardId,
				);
				setBoardIdData(boardData || null);
			} catch (error) {
				console.error('불러오기 오류', error);
			}
		};
		fetchData();
	}, [petId]);

	//미니 드랍다운(수정,삭제하기)
	const toggleDropdown = () => {
		setIsDropdownVisible((prev) => !prev);
	};

	//아이콘사이즈
	const getMoreBtnSize = () => {
		if ($isMobile) return 20;
		return 30;
	};

	//삭제하기 기능
	const deleteAnimalHandler = async () => {
		if (boardIdData) {
			try {
				await deleteAnimal(boardIdData.boardId);
				navigate('/newFamily');
			} catch (error) {
				console.error('삭제오류', error);
			}
		}
	};

	//Form입력관련 handler
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: name === 'nurturePeriod' ? parseInt(value, 10) : value,
		}));
	};

	const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const textareaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	//Form닫기
	const clickCloseBtnHandler = () => {
		setIsModifyMode(false);
	};

	//Form 토글
	const toggleModifyMode = () => {
		setIsModifyMode((prev) => !prev);
		setIsDropdownVisible(false);
	};

	//수정하기 기능
	const modifyAnimalHandler = async () => {
		try {
			if (boardIdData) {
				const modifiedFields = {
					animalName: formData.animalName || boardIdData.animalName,
					kind: formData.kind || boardIdData.kind,
					city: formData.city || boardIdData.city,
					gender: formData.gender || boardIdData.gender,
					breed: formData.breed || boardIdData.breed,
					age: formData.age || boardIdData.age,
					disease: formData.disease || boardIdData.disease,
					training: formData.training || boardIdData.training,
					neutering: formData.neutering || boardIdData.neutering,
					healthCheck: formData.healthCheck || boardIdData.healthCheck,
					nurturePeriod: formData.nurturePeriod || boardIdData.nurturePeriod,
					textReason: formData.textReason || boardIdData.textReason,
					textEtc: formData.textEtc || boardIdData.textEtc,
					files: formData.files || boardIdData.files,
				};

				const response = await modifyAnimal(
					boardIdData.boardId,
					modifiedFields,
				);
				setIsModifyMode(false);
				navigate(`/newFamily/pet/${boardIdData.boardId}`);
				console.log(response);
				window.location.reload();
			} else {
				console.error('boardIdData가 null입니다.');
			}
		} catch (error) {
			console.error('수정 오류:', error);
		}
	};
	//채팅창으로 이동
	const moveToChatHandler = async () => {
		if (isLoggedIn) {
			dispatch(GET_ANIMAL_ID(boardIdData?.boardId));
			const makeRoomId = await makeChatRoom(boardIdData?.boardId);
			if (makeRoomId) {
				const chatRoomId = makeRoomId.chatRoomId;
				if ($isMobile) navigate(`/users/${user.id}/chatRoom/${chatRoomId}`);
				navigate(`/users/${user.id}/chatBox/${chatRoomId}`);
			}
		} else {
			navigate('/login');
		}
	};

	useEffect(() => {
		const fetchScrappedAnimals = async () => {
			try {
				const scrappedAnimalsData = await getScrappedAnimal();

				if (scrappedAnimalsData) {
					const initialState = scrappedAnimalsData.reduce(
						(
							acc: { [key: number]: boolean },
							animal: { animalId?: number },
						) => {
							if (animal.animalId !== undefined) {
								acc[animal.animalId] = true;
							}
							return acc;
						},
						{},
					);
					setBookmarkState(initialState);
				} else {
					console.error('동물데이터가 정의 안 됨');
				}
			} catch (error) {
				console.error('스크랩목록 가져오기 실패:', error);
			}
		};
		fetchScrappedAnimals();
	}, []);

	//북마크 추가
	const clickBookmarkHandler = async (animalId: number) => {
		try {
			if (Object.prototype.hasOwnProperty.call(bookmarkState, animalId)) {
				const updatedBookmarkState = { ...bookmarkState };
				delete updatedBookmarkState[animalId];
				setBookmarkState(updatedBookmarkState);

				console.log('After Deletion:', updatedBookmarkState);

				await scrapAnimal(animalId);
			} else {
				const updatedBookmarkState = { ...bookmarkState, [animalId]: true };
				setBookmarkState(updatedBookmarkState);
				await scrapAnimal(animalId)
					.then((result) => {
						console.log('Scrap Success:', result);
					})
					.catch((error) => {
						console.error('Scrap Error:', error);
					});
			}
		} catch (error) {
			console.error('북마크오류', error);
			setBookmarkState((prev) => ({ ...prev, [animalId]: !prev[animalId] }));
		}
	};

	//북마크컬러변경
	const getBookmarkColor = (animalId: number) => {
		return bookmarkState[animalId] ? 'var(--color-light-salmon)' : '#ffffff70';
	};

	//디바이스에 따른 아이콘 사이즈 조정
	const getBookmarkSize = () => {
		if ($isMobile) return 25;
		return 40;
	};

	const getAdoptionStatusSize = () => {
		if ($isMobile) return 20;
		return 36;
	};

	return (
		<div>
			{isModifyMode ? (
				<ModifyAnimalInfo
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}>
					<CategoryTitle
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						className="register-title">
						<h1>파양 신청서</h1>
						<IoCloseOutline
							className="register-close-btn"
							size={25}
							onClick={clickCloseBtnHandler}
						/>
					</CategoryTitle>
					<div>
						<FormText
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							onSubmit={(e) => e.preventDefault()}>
							<div>
								<h5>동물 이름</h5>
								<input
									type="text"
									name="animalName"
									id="animalName"
									onChange={changeHandler}
									value={formData.animalName || (boardIdData?.animalName ?? '')}
									required
								/>
							</div>
							<div>
								<h5>축종</h5>
								<input
									type="radio"
									name="kind"
									id="dog"
									onChange={changeHandler}
									value="DOG"
								/>
								<label htmlFor="dog">강아지</label>
								<input
									type="radio"
									name="kind"
									id="cat"
									onChange={changeHandler}
									value="CAT"
								/>
								<label htmlFor="cat">고양이</label>
								<input
									type="radio"
									name="kind"
									id="all"
									onChange={changeHandler}
									value="ETC"
								/>
								<label htmlFor="all">기타</label>
							</div>
							<div>
								<h5>지역</h5>
								<select
									id="regionSelect"
									name="city"
									onChange={selectChangeHandler}
									value={formData.city}>
									<option value="" disabled selected hidden>
										지역을 선택해주세요
									</option>
									<option value="서울">서울</option>
									<option value="부산">부산</option>
									<option value="인천">인천</option>
									<option value="대구">대구</option>
									<option value="광주">광주</option>
									<option value="대전">대전</option>
									<option value="울산">울산</option>
									<option value="세종">세종</option>
									<option value="경기">경기</option>
									<option value="강원">강원</option>
									<option value="충북">충북</option>
									<option value="충남">충남</option>
									<option value="전북">전북</option>
									<option value="전남">전남</option>
									<option value="경북">경북</option>
									<option value="경남">경남</option>
									<option value="제주">제주</option>
								</select>
							</div>
							<div>
								<h5>성별</h5>
								<input
									type="radio"
									name="gender"
									id="male"
									onChange={changeHandler}
									value="남"
								/>
								<label htmlFor="male">남</label>
								<input
									type="radio"
									name="gender"
									id="female"
									onChange={changeHandler}
									value="여"
								/>
								<label htmlFor="female">여</label>
							</div>
							<div>
								<h5>품종</h5>
								<input
									type="text"
									name="breed"
									id="breed"
									onChange={changeHandler}
									value={formData.breed || (boardIdData?.breed ?? '')}
									required
								/>
								<h5>/&nbsp;&nbsp;&nbsp;&nbsp;나이</h5>
								<input
									type="text"
									name="age"
									id="age"
									onChange={changeHandler}
									value={formData.age || (boardIdData?.age ?? '')}
									required
								/>
							</div>
							<div>
								<h5>질병</h5>
								<input
									type="text"
									name="disease"
									id="disease"
									onChange={changeHandler}
									value={formData.disease || (boardIdData?.disease ?? '')}
									required
								/>
							</div>
							<div>
								<h5>훈련 여부</h5>
								<input
									type="radio"
									name="training"
									id="training_yes"
									onChange={changeHandler}
									value="훈련완료"
								/>
								<label htmlFor="training_yes">예</label>
								<input
									type="radio"
									name="training"
									id="training_no"
									onChange={changeHandler}
									value="훈련 중"
								/>
								<label htmlFor="training_no">아니오</label>
							</div>
							<div>
								<h5>중성화 여부</h5>
								<input
									type="radio"
									name="neutering"
									id="neutering_yes"
									onChange={changeHandler}
									value="true"
								/>
								<label htmlFor="neutering_yes">예</label>
								<input
									type="radio"
									name="neutering"
									id="neutering_no"
									onChange={changeHandler}
									value="false"
								/>
								<label htmlFor="neutering_no">아니오</label>
							</div>
							<div>
								<h5>검강검진</h5>
								<input
									type="radio"
									name="healthCheck"
									id="health_yes"
									onChange={changeHandler}
									value="예"
								/>
								<label htmlFor="health_yes">예</label>
								<input
									type="radio"
									name="healthCheck"
									id="health_no"
									onChange={changeHandler}
									value="아니오"
								/>
								<label htmlFor="health_no">아니오</label>
							</div>
							<div>
								<h5>양육 기간</h5>
								<input
									type="number"
									name="nurturePeriod"
									id="nurturePeriod"
									placeholder="5개월"
									value={
										formData.nurturePeriod || (boardIdData?.nurturePeriod ?? '')
									}
									onChange={changeHandler}
									required
								/>
							</div>
							<div className="text-box">
								<h5>이별 사유</h5>
								<textarea
									name="textReason"
									id="textReason"
									onChange={textareaChangeHandler}
									value={
										formData.textReason || (boardIdData?.textReason ?? '')
									}></textarea>
							</div>
							<div className="text-box">
								<h5>특이 사항</h5>
								<textarea
									name="textEtc"
									id="textEtc"
									onChange={textareaChangeHandler}
									value={
										formData.textEtc || (boardIdData?.textEtc ?? '')
									}></textarea>
							</div>
							<div className="modify-btn-box">
								<button onClick={modifyAnimalHandler} className="modify-btn">
									수정하기
								</button>
							</div>
						</FormText>
					</div>
				</ModifyAnimalInfo>
			) : (
				<NewFamilyDetailContainer
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}>
					<UserThumbnail
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						className="user-box-mobile">
						<div>
							<img
								src={boardIdData?.userThumbnail}
								alt={boardIdData?.nickname}
							/>
						</div>
						<h5>{boardIdData?.nickname}</h5>
						{isLoggedIn && (
							<RiMore2Line
								color="var(--color-light-salmon"
								size={getMoreBtnSize()}
								onClick={toggleDropdown}
							/>
						)}
						{isDropdownVisible && (
							<MoreDropdown
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								<li>수정하기</li>
								<li onClick={deleteAnimalHandler}>삭제하기</li>
							</MoreDropdown>
						)}
					</UserThumbnail>
					<DetailImageBox
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						<img src={boardIdData?.images[0]} alt={boardIdData?.animalName} />
						{boardIdData?.adoptionStatus === 'COMPLETED' && (
							<div className="adoption-status-icon">
								<PiPawPrintFill
									size={getAdoptionStatusSize()}
									color="var(--color-light-salmon)"
								/>
							</div>
						)}
						<BsBookmarkFill
							color={getBookmarkColor(boardIdData?.boardId ?? 0)}
							size={getBookmarkSize()}
							onClick={(e) => {
								e.stopPropagation();
								clickBookmarkHandler(boardIdData?.boardId ?? 0);
							}}
							className="bookmark-icon"
						/>
					</DetailImageBox>
					<div>
						<UserThumbnail
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							className="user-box-pc">
							<div>
								<img
									src={boardIdData?.userThumbnail}
									alt={boardIdData?.nickname}
								/>
							</div>
							<h5>{boardIdData?.nickname}</h5>
							{isLoggedIn && (
								<RiMore2Line
									color="var(--color-light-salmon"
									size={30}
									onClick={toggleDropdown}
								/>
							)}
							{isDropdownVisible && (
								<MoreDropdown
									$isMobile={$isMobile}
									$isTablet={$isTablet}
									$isPc={$isPc}
									$isMaxWidth={$isMaxWidth}>
									<li onClick={toggleModifyMode}>수정하기</li>
									<li onClick={deleteAnimalHandler}>삭제하기</li>
								</MoreDropdown>
							)}
						</UserThumbnail>
						<DetailTextBox
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							<p>
								<span>이름</span>
								{boardIdData?.animalName}
							</p>
							<p>
								<span>나이</span>
								{boardIdData?.age}개월{' '}
							</p>
							<p>
								<span>지역</span>
								{boardIdData?.city}
							</p>
							<p>
								<span>성별</span>
								{boardIdData?.gender}
							</p>
							<p>
								<span>품종</span>
								{boardIdData?.breed}
							</p>
							<p>
								<span>질병</span>
								{boardIdData?.disease}
							</p>
							<p>
								<span>훈련 여부</span>
								{boardIdData?.training}
							</p>
							<p>
								<span>중성화 여부</span>
								{boardIdData?.neutering === true
									? '완료'
									: boardIdData?.neutering === false
									  ? '미완료'
									  : ''}
							</p>
							<p>
								<span>양육 기간</span>
								{boardIdData?.nurturePeriod}개월
							</p>
							<p>
								<span>검강검진 여부</span>
								{boardIdData?.healthCheck}
							</p>
							<p>
								<span>이별 사유</span> {boardIdData?.textReason}
							</p>
							<p>
								<span>그 외 특이사항</span>
								{boardIdData?.textEtc}
							</p>
						</DetailTextBox>
						<button onClick={() => moveToChatHandler()}>문의하기</button>
					</div>
				</NewFamilyDetailContainer>
			)}

			{$isPc && <NewFamilySwiper />}
		</div>
	);
};

export default NewFamilyDetail;
