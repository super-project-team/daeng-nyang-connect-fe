import { ChangeEvent, useState } from 'react';
import {
	ExParagraph,
	Logo,
	Option,
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
		gender: 'X',
	});

	interface ConfirmModalProps {
		open: boolean;
		onClose: () => void;
	}

	const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const processedValue = name === 'experience' ? value === 'true' : value;
		setInputValue((prevInputValue) => ({
			...prevInputValue,
			[name]: processedValue,
		}));
		setTextIsTouched(true);
	};

	const signupUserHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await naverRegister(inputValue);
			if (!response) return;
			setConfirmModalIsOpen(true);
			navigate('/socialLogin');
		} catch (error) {
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
							required>
							<Option value="" disabled selected>
								성별
							</Option>
							<Option value="man">남성</Option>
							<Option value="woman">여성</Option>
						</RegisterSelectBox>

						<RegisterSelectBoxLeft
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							name="experience"
							required>
							<Option value="" disabled selected>
								키워본 경험
							</Option>
							<Option value="true">있음</Option>
							<Option value="false">없음</Option>
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
