import React, { FC, useState, FormEvent } from 'react';
import {
	ChangeButton,
	CloseButton,
	Contents,
	ModalForm,
	ModalInput,
	ModalWrap,
	Overlay,
	TitleDiv,
} from './NicknameChangeModal.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { changeNickname } from '../../../api/myPageApi';

interface NicknameChangeModalProps {
	open: boolean;
	onClose: (isClosed: boolean) => void;
}

const NicknameChangeModal: FC<NicknameChangeModalProps> = ({
	open,
	onClose,
}) => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const [newNickname, setNewNickname] = useState<string>('');

	const inputValueHandler = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setNewNickname(event.target.value);
	};

	const nicknameChange = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();

		try {
			await changeNickname(newNickname);
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
						닉네임 변경
					</TitleDiv>
					<ModalForm onSubmit={nicknameChange}>
						<ModalInput
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							onChange={inputValueHandler}
							type="text"
							placeholder="새 닉네임"></ModalInput>
						<ChangeButton
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							type="submit">
							닉네임 변경
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

export default NicknameChangeModal;
