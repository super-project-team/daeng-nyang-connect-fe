import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../hooks/useResponsive';
import {
	Button,
	ButtonWrap,
	Container,
	InfoWrap,
	TopBar,
} from './CheckLogin.style';

interface LoginCheckProps {
	setIsCheckLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckLogin = ({ setIsCheckLogin }: LoginCheckProps) => {
	const { $isMobile } = useResponsive();

	const navigate = useNavigate();

	return (
		<Container $isMobile={$isMobile}>
			<TopBar></TopBar>
			<InfoWrap $isMobile={$isMobile}>
				<p>해당 기능은 로그인이 필요합니다.</p>
				<ButtonWrap>
					<Button $isMobile={$isMobile} onClick={() => navigate('/login')}>
						확인
					</Button>
					<Button $isMobile={$isMobile} onClick={() => setIsCheckLogin(false)}>
						취소
					</Button>
				</ButtonWrap>
			</InfoWrap>
		</Container>
	);
};

export default CheckLogin;
