import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import {
	ChangeButton,
	CloseButton,
	Contents,
	ModalForm,
	ModalInput,
	ModalWrap,
	Overlay,
	Paragraph,
	TitleDiv,
} from './PasswordChangeModal.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { changePassword } from '../../../api/authApi';

interface PasswordChangeModalProps {
	open: boolean;
	onClose: (isClosed: boolean) => void;
}

const PasswordChangeModal: FC<PasswordChangeModalProps> = ({
	open,
	onClose,
}) => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const [password, setPassword] = useState('');
	const [pwdCheck, setPwdCheck] = useState('');
	const [passwordSame, setPasswordSame] = useState(false);
	const [pwOnFocus, setPwOnFocus] = useState(false);
	const [passwordIsValid, setPasswordIsValid] = useState(false);
	const [buttonClicked, setButtonClicked] = useState(false);

	const isPasswordValid = (password: string) => {
		if (password.length < 6) {
			return false;
		}

		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasDigit = /\d/.test(password);
		const hasSpecialChar = /[!@#$%^&*()\-_=+[\]{};:'",<.>/?\\|]/.test(password);

		const conditionsMet =
			hasSpecialChar && (hasUpperCase || hasLowerCase || hasDigit);
		return conditionsMet;
	};

	const passwordChange = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();
		setButtonClicked(true);

		if (password !== pwdCheck) {
			setPasswordSame(false);
			return;
		}

		// Compare passwords before calling changePassword
		if (passwordIsValid) {
			try {
				await changePassword(password);
				onClose(false);
			} catch (error) {
				// Handle errors
			}
		} else {
			// Handle case where passwords don't match
			console.error('Passwords do not match');
		}
	};
	const pwOnFocusHandler = () => {
		setPasswordSame(true);
		setPwOnFocus(true);
		setButtonClicked(false);
	};

	const pwOnBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setPwOnFocus(false);
		if (e.target.value.trim() === '') {
			setPasswordIsValid(false);
		}
		if (!isPasswordValid(e.target.value)) {
			setPasswordIsValid(false);
		} else {
			setPasswordIsValid(true);
		}
	};

	return (
		<Overlay>
			<ModalWrap
				$isMobile={$isMobile}
				$isTablet={$isTablet}
				$isPc={$isPc}
				$isMaxWidth={$isMaxWidth}>
				<Contents>
					<TitleDiv
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						비밀번호 변경
					</TitleDiv>
					<ModalForm onSubmit={passwordChange}>
						<ModalInput
							name="password"
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							onFocus={pwOnFocusHandler}
							onBlur={pwOnBlurHandler}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="새 비밀번호"></ModalInput>
						{pwOnFocus && (
							<Paragraph
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								영문, 숫자, 특수문자 중 2개 이상 포함 6자리 이상
							</Paragraph>
						)}
						{!passwordIsValid && buttonClicked && (
							<Paragraph
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								조건을 만족하지 않습니다.
							</Paragraph>
						)}
						<ModalInput
							name="pwdCheck"
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							onChange={(e) => setPwdCheck(e.target.value)}
							type="password"
							placeholder="비밀번호 확인"></ModalInput>
						{!passwordSame && buttonClicked && (
							<Paragraph
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								비밀번호가 일치하지 않습니다.
							</Paragraph>
						)}
						<ChangeButton
							type="submit"
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							비밀번호 변경
						</ChangeButton>

						<CloseButton
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							onClick={() => {
								onClose(false);
							}}>
							닫기
						</CloseButton>
					</ModalForm>
				</Contents>
			</ModalWrap>
		</Overlay>
	);
};

export default PasswordChangeModal;
