import { Link } from 'react-router-dom';
import { FooterMenuDD } from '../Footer.style';
import { useResponsive } from '../../../hooks/useResponsive';

type TextProps = {
	text: string;
	moveTo: string;
};

const FooterMenuText = ({ text, moveTo }: TextProps) => {
	const { $isMobile } = useResponsive();
	return (
		<FooterMenuDD $isMobile={$isMobile}>
			<Link to={moveTo} className="footerText">
				{text}
			</Link>
		</FooterMenuDD>
	);
};

export default FooterMenuText;
