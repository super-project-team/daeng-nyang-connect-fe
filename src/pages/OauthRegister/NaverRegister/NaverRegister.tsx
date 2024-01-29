import { ChangeEvent, useEffect, useState } from 'react';
import {
	ExParagraph,
	Logo,
	Paragraph,
	RegisterButton,
	RegisterDiv,
	RegisterDoubleDiv,
	RegisterForm,
	RegisterInput,
	RegisterInputSmall,
	RegisterSelectBox,
	RegisterSelectBoxLeft,
	RegisterWrapper,
} from './NaverRegister.style';
import { useNavigate } from 'react-router-dom';
import { naverRegister } from '../../../api/authApi';
import ConfirmModal from '../../../components/Register/Modal/ConfirmModal/ConfirmModal';
import { useResponsive } from '../../../hooks/useResponsive';

interface SignupRequestBody {
	city: string;
	town: string;
	experience: boolean;
	gender: string;
	nickname: string;
}

const NaverRegister = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const navigate = useNavigate();
	const [isSignUpClicked, setIsSignUpClicked] = useState(false);

	const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
	const [textIsTouched, setTextIsTouched] = useState(false);

	const [nicknameIsDuplicated, setNicknameIsDuplicated] = useState(false);

	const [inputValue, setInputValue] = useState<SignupRequestBody>({
		city: '',
		town: '',
		experience: false,
		gender: '',
		nickname: '',
	});

	interface ConfirmModalProps {
		open: boolean;
		onClose: () => void;
	}

	useEffect(() => {
		if (document.cookie.includes('access')) {
			const cookie = document.cookie;
			const accessTokenMatch = cookie.match(/access_token=([^;]*)/);
			const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;

			const refreshTokenMatch = cookie.match(/refresh_token=([^;]*)/);
			const refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;
			if (accessToken) localStorage.setItem('access_token', accessToken);
			if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
		}
	}, []);

	const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputValue((prevInputValue) => ({
			...prevInputValue,
			[name]: value,
		}));
		setTextIsTouched(true);
	};

	const inputSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		const setValue = name === 'experience' ? JSON.parse(value) : value;
		setInputValue((prevInputValue) => ({
			...prevInputValue,
			[name]: setValue,
		}));
		setTextIsTouched(true);
	};

	const signupUserHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await naverRegister(inputValue);
			console.log(response);
			if (response) {
				setConfirmModalIsOpen(true);
				navigate('/socialLogin');
			}
		} catch (error) {
			console.log(error);
			if (e instanceof TypeError) {
				// TypeError
			} else if (e instanceof SyntaxError) {
				// SyntaxError
			} else if (typeof e === 'string') {
				// string
			} else {
				// other
			}
		}
	};

	return (
		<RegisterWrapper
			$isMobile={$isMobile}
			$isTablet={$isTablet}
			$isPc={$isPc}
			$isMaxWidth={$isMaxWidth}>
			<RegisterDiv
				$isMobile={$isMobile}
				$isTablet={$isTablet}
				$isPc={$isPc}
				$isMaxWidth={$isMaxWidth}>
				<Logo
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}
					src="assets/logos/LOGO(footer).svg"></Logo>
				<RegisterForm onSubmit={signupUserHandler}>
					<RegisterDoubleDiv
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						<RegisterInputSmall
							type="text"
							placeholder="시 도"
							name="city"
							onChange={inputValueHandler}
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}></RegisterInputSmall>

						<RegisterInputSmall
							placeholder="상세주소"
							type="text"
							name="town"
							onChange={inputValueHandler}
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}></RegisterInputSmall>
					</RegisterDoubleDiv>
					<RegisterDoubleDiv
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						<RegisterSelectBox
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							name="gender"
							onChange={inputSelectHandler}
							required>
							<option value="" disabled selected>
								성별
							</option>
							<option value="man">남성</option>
							<option value="woman">여성</option>
						</RegisterSelectBox>

						<RegisterSelectBoxLeft
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							name="experience"
							onChange={inputSelectHandler}
							required>
							<option value="" disabled selected>
								키워본 경험
							</option>
							<option value="true">있음</option>
							<option value="false">없음</option>
						</RegisterSelectBoxLeft>
					</RegisterDoubleDiv>
					<RegisterInput placeholder="닉네임"></RegisterInput>
					<RegisterButton
						type="submit"
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						회원가입
					</RegisterButton>
					{confirmModalIsOpen && (
						<ConfirmModal
							onClose={() => {
								setConfirmModalIsOpen(false);
							}}
						/>
					)}
				</RegisterForm>
			</RegisterDiv>
		</RegisterWrapper>
	);
};

export default NaverRegister;
