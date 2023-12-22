import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	Button,
	ButtonWrapper,
	Image,
	LoginButton,
	LoginDiv,
	LoginForm,
	LoginInput,
	LoginTitleDiv,
	LoginWrapper,
	Logo,
	NaverLoginButton,
	Paragraph,
	ParagraphLogin,
	SignUpButton,
	SignUpDiv,
} from './Login.style';
import localToken from '../../api/LocalToken';
import { useResponsive } from '../../hooks/useResponsive';
import { loginUser } from '../../api/authApi';
import { LOGIN_USER } from '../../slice/userSlice';

const Login = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formIsValid, setFormIsValid] = useState(true);
	const [isSignInClicked, setIsSignInClicked] = useState(false);
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [passwordIsValid, setPasswordIsValid] = useState(false);
	const [textIsTouched, setTextIsTouched] = useState(false || isSignInClicked);
	const [inputValue, setInputValue] = useState({
		email: '',
		password: '',
	});

	const REST_API_KEY = '6fc9a85c166f286a6359b9c663ebcfbd';
	const REDIRECT_URI = 'http://3.35.16.126:8080/kakao_redirect';
	const kakaoLink = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=9a6d4d310426b352391b42b2cb0d0f93&scope=profile_nickname%20profile_image&state=imDR6apbGH24izXzRz6EdvTiicMnNt6rUzM3c_zoMH8%3D&redirect_uri=http://localhost:8080/kakao_redirect`;

	const kakaoLoginHandler = () => {
		window.location.href = kakaoLink;
	};

	const NaverLink =
		'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=E6A9JK080EcQ6AeJLJTf&scope=name%20email%20profile_image%20nickname%20gender%20mobile&state=wRRwsVwQNglwTdCE-uj3TZRmx6wfbI1q50HKX2xKsGQ%3D&redirect_uri=http://localhost:8080/naver_redirect';

	const NaverLoginHandler = () => {
		window.location.href = NaverLink;
	};

	const onRegisterClick = () => {
		navigate('/register');
	};

	const onIdFindClick = () => {
		navigate('/idFind');
	};

	const onPasswordFindClick = () => {
		navigate('/passwordFind');
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

		if (name === 'password') {
			if (e.target.value.trim() === '') {
				setPasswordIsValid(false);
			}

			if (e.target.value.length > 0 && e.target.value.length < 6) {
				setPasswordIsValid(false);
			} else setPasswordIsValid(true);
		}
	};

	const loginUserHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		if (emailIsValid && passwordIsValid) {
			try {
				const response = await loginUser(inputValue);

				if (!response) {
					setFormIsValid(false);
					return;
				}

				const { access_token, nickname, id } = response;

				const saveToken = (token: string) => {
					localToken.save(token);
				};

				dispatch(
					LOGIN_USER({
						isLoggedIn: true,
						nickname: nickname,
						id: id,
					}),
				);

				if (access_token) {
					saveToken(access_token);
					navigate('/');
				}
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

		setIsSignInClicked(true);
	};

	const nameEmailInputIsInValid =
		!emailIsValid && textIsTouched && isSignInClicked;
	const namePasswordInputIsInValid =
		!passwordIsValid && textIsTouched && isSignInClicked;

	return (
		<LoginWrapper>
			<LoginDiv>
				<LoginTitleDiv>
					<Logo
						src="assets/logos/LOGO(footer).svg"
						alt=""
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
					/>
				</LoginTitleDiv>
				<LoginForm onSubmit={loginUserHandler}>
					<LoginInput
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						placeholder="아이디"
						type="text"
						name="email"
						onChange={inputValueHandler}></LoginInput>
					{nameEmailInputIsInValid && (
						<Paragraph
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							올바른 이메일 형식으로 입력해주세요.
						</Paragraph>
					)}
					<LoginInput
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						placeholder="비밀번호"
						type="password"
						name="password"
						onChange={inputValueHandler}></LoginInput>
					{namePasswordInputIsInValid && (
						<Paragraph
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							비밀번호는 최소 6자리 이상이어야 합니다.
						</Paragraph>
					)}
					<LoginButton
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						type="submit">
						로그인
					</LoginButton>
					{!formIsValid && (
						<ParagraphLogin
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							이메일 또는 비밀번호가 일치하지 않습니다.
						</ParagraphLogin>
					)}
				</LoginForm>
				<SignUpDiv>
					<SignUpButton onClick={onIdFindClick}>아이디 찾기</SignUpButton>
					<SignUpButton onClick={onPasswordFindClick}>
						비밀번호 찾기
					</SignUpButton>
					<SignUpButton onClick={onRegisterClick}>회원가입</SignUpButton>
				</SignUpDiv>
				<ButtonWrapper>
					<Button>
						<Image
							src="/assets/icons/icon-kakao.png"
							alt="kakao-icon"
							onClick={kakaoLoginHandler}
						/>
					</Button>
					<Button>
						<Image
							src="/assets/icons/icon-naver.png"
							alt="twitter-icon"
							onClick={NaverLoginHandler}
						/>
					</Button>
					<Button>
						<Image src="/assets/icons/icon-google.svg" alt="google-icon" />
					</Button>
				</ButtonWrapper>
			</LoginDiv>
		</LoginWrapper>
	);
};

export default Login;
