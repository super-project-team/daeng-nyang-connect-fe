import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../hooks/useResponsive';
import { LoginStateButtonBox, LoginStatePopup } from './LoginPopup.style';
import { SetStateAction } from 'react';

interface Props {
	setLoginPopup: React.Dispatch<SetStateAction<boolean>>;
}
const LoginPopup = ({ setLoginPopup }: Props) => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const navigate = useNavigate();

	const confirmHandler = () => {
		navigate('/login');
	};

	const cancelHandler = () => {
		setLoginPopup((prev: boolean) => !prev);
	};

	return (
		<LoginStatePopup
			$isMobile={$isMobile}
			$isTablet={$isTablet}
			$isPc={$isPc}
			$isMaxWidth={$isMaxWidth}>
			<div></div>
			<div>
				<div>해당 기능은 로그인이 필요합니다</div>
				<LoginStateButtonBox
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}>
					<button onClick={confirmHandler}>확인</button>
					<button onClick={cancelHandler}>취소</button>
				</LoginStateButtonBox>
			</div>
		</LoginStatePopup>
	);
};

export default LoginPopup;
