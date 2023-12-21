import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../hooks/useResponsive';
import {
	CategoryTitle,
	FormText,
	PetRegistrationForm,
} from '../NewFamily.style';
import { IoCloseOutline } from 'react-icons/io5';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAnimal } from '../../../api/newFamilyApi';

const PetRegistration = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
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
		nurturePeriod: '',
		files: [],
		textReason: '',
		textEtc: '',
	});

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const uploadFiles = Array.from(e.target.files);
			setFormData((prev: any) => {
				return { ...prev, files: uploadFiles };
			});
		}
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

	const clickCloseBtnHandler = () => {
		const url = '/newFamily';
		navigate(url);
	};

	console.log(formData);

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await registerAnimal(formData);
			console.log('등록완료', response);
			navigate('/newFamily');
		} catch (error) {
			console.error('실패', error);
		}
	};

	return (
		<PetRegistrationForm
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
					$isMaxWidth={$isMaxWidth}>
					<div>
						<h5>동물 이름</h5>
						<input
							type="text"
							name="animalName"
							id="animalName"
							onChange={changeHandler}
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
							required
						/>
						<h5>나이(개월)</h5>
						<input
							type="text"
							name="age"
							id="age"
							onChange={changeHandler}
							placeholder="16"
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
						<h5>양육 기간(개월)</h5>
						<input
							type="number"
							name="nurturePeriod"
							id="nurturePeriod"
							onChange={changeHandler}
							required
						/>
					</div>
					<div>
						<h5>이미지 등록</h5>
						<input
							type="file"
							name="files"
							id="fileInput"
							accept=".jpg, .jpeg, .png"
							onChange={imgHandler}
							required
						/>
					</div>
					<div className="text-box">
						<h5>이별 사유</h5>
						<textarea
							name="textReason"
							id="textReason"
							onChange={textareaChangeHandler}
							value={formData.textReason}></textarea>
					</div>
					<div className="text-box">
						<h5>특이 사항</h5>
						<textarea
							name="textEtc"
							id="textEtc"
							onChange={textareaChangeHandler}
							value={formData.textEtc}></textarea>
					</div>
					<button onClick={submitHandler}>등록하기</button>
				</FormText>
			</div>
		</PetRegistrationForm>
	);
};

export default PetRegistration;
