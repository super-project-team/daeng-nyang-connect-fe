import React, { FC, useState } from 'react';
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

interface NicknameChangeModalProps {
	open: boolean;
	onClose: (isClosed: boolean) => void;
}

const NicknameChangeModal: FC<NicknameChangeModalProps> = ({
	open,
	onClose,
}) => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
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
					<ModalForm>
						<ModalInput
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							type="text"
							placeholder="변경할 닉네임을 입력해주세요."></ModalInput>
						<ChangeButton
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
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
