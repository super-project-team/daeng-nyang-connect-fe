import { useNavigate } from 'react-router-dom';
import {
	CloseButton,
	Contents,
	ModalForm,
	ModalWrap,
	Overlay,
	TitleDiv,
} from './ConfirmModal.style';
import PropTypes from 'prop-types';
import { useResponsive } from '../../../../hooks/useResponsive';

interface ConfirmModalProps {
	onClose: (flag: boolean) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onClose }) => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const navigate = useNavigate();
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
						계정생성이 완료되었습니다!
					</TitleDiv>
					<ModalForm>
						<CloseButton
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							onClick={() => {
								onClose(false);
								navigate('/login');
							}}>
							Close
						</CloseButton>
					</ModalForm>
				</Contents>
			</ModalWrap>
		</Overlay>
	);
};

ConfirmModal.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default ConfirmModal;
