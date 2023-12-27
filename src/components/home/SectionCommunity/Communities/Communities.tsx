import {
	CommunityImgDiv,
	CommunityLi,
	CommunityTitleDt,
	CommunityTextDl,
} from './Communities.style';
import { Link } from 'react-router-dom';
import { useResponsive } from '../../../../hooks/useResponsive';

interface CommunityProps {
	to: string;
	img: string;
	title: string;
	children: string;
}

const Communities = ({ to, title, img, children }: CommunityProps) => {
	const { $isTablet, $isMobile } = useResponsive();
	return (
		<CommunityLi $isMobile={$isMobile}>
			<Link to={to} className="li-link">
				<CommunityImgDiv $isMobile={$isMobile} $isTablet={$isTablet}>
					<img src={img} alt="" />
				</CommunityImgDiv>
				<CommunityTextDl $isMobile={$isMobile}>
					<CommunityTitleDt $isMobile={$isMobile}>{title}</CommunityTitleDt>
					{!$isMobile && <dd>{children}</dd>}
				</CommunityTextDl>
			</Link>
		</CommunityLi>
	);
};

export default Communities;
