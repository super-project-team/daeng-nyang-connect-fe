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
} from './InfoChangeModal.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { changeInfo } from '../../../api/authApi';

interface InfoChangeModalProps {
	open: boolean;
	onClose: (isClosed: boolean) => void;
}

const InfoChangeModal: FC<InfoChangeModalProps> = ({ open, onClose }) => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const [newInfo, setNewInfo] = useState<string>('');

	const inputValueHandler = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setNewInfo(event.target.value);
	};

	const infoChange = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();

		try {
			await changeInfo(newInfo);
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
						소개글 변경
					</TitleDiv>
					<ModalForm onSubmit={infoChange}>
						<ModalInput
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							onChange={inputValueHandler}
							type="text"
							placeholder="변경할 소개글을 입력해주세요."></ModalInput>
						<ChangeButton
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							소개글 변경
						</ChangeButton>
						<CloseButton
							type="submit"
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

export default InfoChangeModal;
