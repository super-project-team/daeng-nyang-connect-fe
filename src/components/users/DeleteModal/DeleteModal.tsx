import React, { FC, FormEvent, useState } from 'react';
import {
	ChangeButton,
	CloseButton,
	Contents,
	ModalForm,
	ModalInput,
	ModalWrap,
	Overlay,
	TitleDiv,
} from './DeleteModal.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { deleteUser, logoutUser } from '../../../api/authApi';
import { useNavigate } from 'react-router-dom';

interface DeleteModalProps {
	open: boolean;
	onClose: (isClosed: boolean) => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ open, onClose }) => {
	const navigate = useNavigate();
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const [inputValue, setInputValue] = useState({
		email: '',
		password: '',
	});

	const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputValue((prevInputValue) => ({
			...prevInputValue,
			[name]: value,
		}));
	};

	const deleteUserHandler = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();

		try {
			const response = await deleteUser(inputValue);
			if (!response) {
				return;
			}
			await logoutUser();
			navigate('/');
			onClose(false);
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
						계정삭제
					</TitleDiv>
					<ModalForm onSubmit={deleteUserHandler}>
						<ModalInput
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							type="text"
							name="email"
							onChange={inputValueHandler}
							placeholder="이메일"></ModalInput>
						<ModalInput
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							type="password"
							name="password"
							onChange={inputValueHandler}
							placeholder="비밀번호"></ModalInput>
						<ChangeButton
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							계정삭제
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

export default DeleteModal;
