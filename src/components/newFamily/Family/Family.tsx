import { useNavigate } from 'react-router-dom';
import NewFamilyList from './NewFamilyList';
import {
	CategoryTitle,
	FilterItems,
	FindFamily,
	LoginStateButtonBox,
	LoginStatePopup,
} from '../NewFamily.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { IoCloseOutline } from 'react-icons/io5';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Family = () => {
	const navigate = useNavigate();
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const [isFilterVisible, setIsFilterVisible] = useState($isPc);
	const [filterKind, setFilterKind] = useState<string | null>(null);
	const [filterCity, setFilterCity] = useState<string | null>(null);
	const [filterAdoptionStatus, setFilterAdoptionStatus] = useState<
		string | null
	>(null);
	const [appliedFilters, setAppliedFilters] = useState({
		kind: null as string | null,
		city: null as string | null,
		adoptionStatus: null as string | null,
	});
	const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
	const [showLoginPopup, setShowLoginPopup] = useState(false);

	const toggleLoginPopup = () => {
		setShowLoginPopup((prev) => !prev);
	};

	//등록화면으로 이동
	const clickRegistrationHandler = () => {
		if (!isLoggedIn) {
			toggleLoginPopup();
		} else {
			const url = '/newFamily/petRegistration';
			navigate(url);
		}
	};

	//로그인페이지로 이동
	const confirmHandler = () => {
		navigate('/login');
	};

	//취소창-> 팝업끄기
	const cancelHandler = () => {
		toggleLoginPopup();
	};

	//디바이스에 따른 필터창의 위치조정
	const toggleFilterVisibility = () => {
		setIsFilterVisible((prev) => !prev);
	};

	//필터적용
	const handleFilterChange = (filterType: string, value: string | null) => {
		console.log(`Filter Type: ${filterType}, Value: ${value}`);
		const sanitizedValue = value === 'ALL' || !value ? null : value;
		setFilterKind((prevFilterKind) =>
			filterType === 'kind' ? sanitizedValue : prevFilterKind,
		);
		setFilterCity((prevFilterCity) =>
			filterType === 'city' ? sanitizedValue : prevFilterCity,
		);
		setFilterAdoptionStatus((prevFilterAdoptionStatus) =>
			filterType === 'adoptionStatus'
				? sanitizedValue
				: prevFilterAdoptionStatus,
		);
	};

	return (
		<FindFamily
			$isMobile={$isMobile}
			$isTablet={$isTablet}
			$isPc={$isPc}
			$isMaxWidth={$isMaxWidth}>
			<CategoryTitle
				$isMobile={$isMobile}
				$isTablet={$isTablet}
				$isPc={$isPc}
				$isMaxWidth={$isMaxWidth}>
				<h1>새로운 가족 찾기</h1>
				<button onClick={clickRegistrationHandler} className="register-btn">
					등록하기
				</button>
				{showLoginPopup && (
					<LoginStatePopup
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						<div></div>
						<div>
							<div>해당 기능은 로그인이 필요합니다</div>
							<LoginStateButtonBox
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								<button onClick={confirmHandler}>확인</button>
								<button onClick={cancelHandler}>취소</button>
							</LoginStateButtonBox>
						</div>
					</LoginStatePopup>
				)}
				<button onClick={toggleFilterVisibility} className="filter-btn">
					찾기
				</button>
			</CategoryTitle>
			<div>
				{($isPc || isFilterVisible) && (
					<FilterItems
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						<div>찾기</div>
						<IoCloseOutline
							className="filter-close-btn"
							size={25}
							onClick={toggleFilterVisibility}
						/>
						<div>
							<div>
								<p>축종</p>
								<input
									type="radio"
									name="animalType"
									id="all"
									value="ALL"
									onChange={(e) => handleFilterChange('kind', e.target.value)}
								/>
								<label htmlFor="all">전체</label>
								<input
									type="radio"
									name="animalType"
									id="dog"
									value="DOG"
									onChange={(e) => handleFilterChange('kind', e.target.value)}
								/>
								<label htmlFor="dog">강아지</label>
								<input
									type="radio"
									name="animalType"
									id="cat"
									value="CAT"
									onChange={(e) => handleFilterChange('kind', e.target.value)}
								/>
								<label htmlFor="cat">고양이</label>
							</div>
							<div>
								<p>완료여부</p>
								<input
									type="radio"
									name="adoption"
									id="all"
									value="ALL"
									onChange={(e) =>
										handleFilterChange('adoptionStatus', e.target.value)
									}
								/>
								<label htmlFor="all">전체</label>
								<input
									type="radio"
									name="adoption"
									id="yet"
									value="PROGRESS"
									onChange={(e) =>
										handleFilterChange('adoptionStatus', e.target.value)
									}
								/>
								<label htmlFor="yet">입양대기</label>
								<input
									type="radio"
									name="adoption"
									id="done"
									value="COMPLETED"
									onChange={(e) =>
										handleFilterChange('adoptionStatus', e.target.value)
									}
								/>
								<label htmlFor="done">입양완료</label>
							</div>
							<div>
								<p>지역</p>
								<select
									id="regionSelect"
									onChange={(e) => handleFilterChange('city', e.target.value)}
									defaultValue="">
									<option value="" disabled>
										지역을 선택해주세요
									</option>
									<option value="ALL">전체</option>
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
							<button
								onClick={() => {
									console.log('Clicked Search Button');
									console.log(
										'Filters:',
										filterKind,
										filterCity,
										filterAdoptionStatus,
									);
									setAppliedFilters({
										kind: filterKind,
										city: filterCity,
										adoptionStatus: filterAdoptionStatus,
									});
								}}>
								검색하기
							</button>
						</div>
					</FilterItems>
				)}

				<NewFamilyList
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}
					filterKind={appliedFilters.kind}
					filterCity={appliedFilters.city}
					filterAdoptionStatus={appliedFilters.adoptionStatus}
				/>
			</div>
			<div
				className="register-fixed-btn-box"
				onClick={clickRegistrationHandler}>
				<FaPlus className="register-fixed-btn" color="#fff" size={20} />
			</div>
		</FindFamily>
	);
};

export default Family;
