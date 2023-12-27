import { useResponsive } from '../../../hooks/useResponsive';
import { BannerContentsDiv, BannerDiv, BannerSloganDiv } from './Banner.style';

const Banner = () => {
	const { $isMaxWidth, $isMobile } = useResponsive();
	return (
		<BannerDiv $isMobile={$isMobile}>
			<BannerContentsDiv $isMaxWidth={$isMaxWidth}>
				<BannerSloganDiv $isMobile={$isMobile}>
					<img src="assets/slogan.svg" alt="만난다, 귀엽다, 예쁘다" />
				</BannerSloganDiv>
			</BannerContentsDiv>
		</BannerDiv>
	);
};

export default Banner;
