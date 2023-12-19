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
} from './TelChangeModal.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { changeMobile } from '../../../api/authApi';

interface TelChangeModalProps {
	open: boolean;
	onClose: (isClosed: boolean) => void;
}

const TelChangeModal: FC<TelChangeModalProps> = ({ open, onClose }) => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const [newMobile, setNewMobile] = useState<string>('');

	const inputValueHandler = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setNewMobile(event.target.value);
	};

	const mobileChange = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();

		try {
			await changeMobile(newMobile);
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
						전화번호 변경
					</TitleDiv>
					<ModalForm onSubmit={mobileChange}>
						<ModalInput
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							onChange={inputValueHandler}
							type="text"
							placeholder="새 전화번호"></ModalInput>
						<ChangeButton
							type="submit"
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							전화번호 변경
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

export default TelChangeModal;
