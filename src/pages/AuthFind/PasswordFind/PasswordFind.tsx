import React, { ChangeEvent, useState } from 'react';
import {
	FindButton,
	FindDiv,
	FindForm,
	FindInput,
	FindTitleDiv,
	FindWrapper,
	Logo,
	Paragraph,
	SignUpButton,
	SignUpDiv,
} from './PasswordFind.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { useNavigate } from 'react-router-dom';
import { findId } from '../../../api/authApi';

const PasswordFind = () => {
	const navigate = useNavigate();
	const [isHandlerClicked, setIsHandlerClicked] = useState(false);
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const [textIsTouched, setTextIsTouched] = useState(false || isHandlerClicked);
	const [inputValue, setInputValue] = useState({
		name: '',
		mobile: '',
		email: '',
		newPassword: '',
	});
	const regExpName = /^[가-힣]{2,4}$/;
	const regExpMobile = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
	const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d|.*[\W_])[A-Za-z\d\W_]{6,}$/;

	const [emailIsValid, setEmailIsValid] = useState(false);

	const [nameIsValid, setNameIsValid] = useState(false);

	const [mobileIsValid, setMobileIsValid] = useState(false);
	const [mobileOnFocus, setMobileOnFocus] = useState(false);

	const [passwordIsValid, setPasswordIsValid] = useState(false);
	const [passwordOnFocus, setPasswordOnFocus] = useState(false);

	const mobileOnFocusHandler = () => {
		setMobileOnFocus(true);
		setMobileIsValid(true);
	};
	const mobileOnBlurHandler = () => {
		setMobileOnFocus(false);
	};

	const passwordOnFocusHandler = () => {
		setPasswordIsValid(true);
		setPasswordOnFocus(true);
	};
	const passwordOnBlurHandler = () => {
		setPasswordOnFocus(false);
	};

	const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputValue({ ...inputValue, [name]: value });

		setTextIsTouched(true);

		if (name === 'email') {
			if (e.target.value.trim() === '') {
				setEmailIsValid(false);
			}
			if (e.target.value.length > 0 && /^.+@.+\..+$/.test(e.target.value)) {
				setEmailIsValid(true);
			} else {
				setEmailIsValid(false);
			}
		}

		if (name === 'name') {
			if (name === 'name') {
				if (regExpName.test(e.target.value)) {
					setNameIsValid(true);
				} else {
					setNameIsValid(false);
				}
			}
		}

		if (name === 'mobile') {
			if (regExpMobile.test(e.target.value)) {
				setMobileIsValid(true);
			} else {
				setMobileIsValid(false);
			}
		}

		if (name === 'newPassword') {
			if (regExpPassword.test(e.target.value)) {
				setPasswordIsValid(true);
			} else {
				setMobileIsValid(false);
			}
		}
	};

	const loginUserHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		if (emailIsValid && nameIsValid && mobileIsValid && passwordIsValid) {
			try {
				const response = await findId(inputValue);
				console.log(response);

				if (!response) return;
			} catch (error) {
				if (error instanceof TypeError) {
					// TypeError
				} else if (error instanceof SyntaxError) {
					// SyntaxError
				} else if (typeof error === 'string') {
					// string
				} else {
					// other
				}
			}
		}

		setIsHandlerClicked(true);
	};

	const onRegisterClick = () => {
		navigate('/register');
	};

	const onLoginClick = () => {
		navigate('/login');
	};

	const NameInputIsInValid = !nameIsValid && textIsTouched && isHandlerClicked;
	const MobileInputIsInValid =
		!mobileIsValid && textIsTouched && isHandlerClicked;
	const PasswordInputIsInValid =
		!passwordIsValid && textIsTouched && isHandlerClicked;
	const EmailInputIsInValid =
		!emailIsValid && textIsTouched && isHandlerClicked;

	return (
		<FindWrapper>
			<FindDiv>
				<FindTitleDiv>
					<Logo
						src="assets/logos/LOGO(footer).svg"
						alt=""
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
					/>
				</FindTitleDiv>
				<FindForm onSubmit={loginUserHandler}>
					<FindInput
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						placeholder="이메일"
						type="text"
						name="email"
						onChange={inputValueHandler}></FindInput>
					{EmailInputIsInValid && (
						<Paragraph
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							올바른 이메일 형식으로 입력해주세요.
						</Paragraph>
					)}
					<FindInput
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						placeholder="이름"
						type="text"
						name="name"
						onChange={inputValueHandler}></FindInput>
					{NameInputIsInValid && (
						<Paragraph
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							올바른 이름의 형식으로 입력해주세요.
						</Paragraph>
					)}
					<FindInput
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						placeholder="전화번호"
						type="text"
						name="mobile"
						onChange={inputValueHandler}
						onFocus={mobileOnFocusHandler}
						onBlur={mobileOnBlurHandler}></FindInput>
					{MobileInputIsInValid && (
						<Paragraph
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							올바른 전화번호의 형식으로 입력해주세요
						</Paragraph>
					)}
					{mobileOnFocus && (
						<Paragraph
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							ex)010-0000-0000
						</Paragraph>
					)}
					<FindInput
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						placeholder="새 비밀번호"
						type="password"
						name="newPassword"
						onChange={inputValueHandler}
						onFocus={passwordOnFocusHandler}
						onBlur={passwordOnBlurHandler}></FindInput>
					{PasswordInputIsInValid && (
						<Paragraph
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							올바른 전화번호를 입력해주세요
						</Paragraph>
					)}
					{passwordOnFocus && (
						<Paragraph
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							영문, 숫자, 특수문자 중 2개 이상을 조합하여 최소 6자리 이상으로
							입력해주세요.
						</Paragraph>
					)}
					<FindButton
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						type="submit">
						새 비밀번호로 변경
					</FindButton>
				</FindForm>
				<SignUpDiv>
					<SignUpButton onClick={onLoginClick}>로그인 페이지로</SignUpButton>
					<SignUpButton onClick={onRegisterClick}>회원가입</SignUpButton>
					<SignUpButton>비밀번호 찾기</SignUpButton>
				</SignUpDiv>
			</FindDiv>
		</FindWrapper>
	);
};

export default PasswordFind;
