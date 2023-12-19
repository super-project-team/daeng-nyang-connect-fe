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
} from './DeleteModal.style';
import { useResponsive } from '../../../hooks/useResponsive';

interface DeleteModalProps {
	open: boolean;
	onClose: (isClosed: boolean) => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ open, onClose }) => {
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
						계정삭제
					</TitleDiv>
					<ModalForm>
						<ModalInput
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							type="text"
							placeholder="이메일을 입력해주세요."></ModalInput>
						<ModalInput
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							type="password"
							placeholder="비밀번호를 입력해주세요."></ModalInput>
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
