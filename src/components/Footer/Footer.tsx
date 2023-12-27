import { useResponsive } from '../../hooks/useResponsive';
import {
	FooterCopyrightDiv,
	FooterCopyrightP,
	FooterDiv,
	FooterDt,
	FooterFlexDiv,
	FooterInnerDiv,
	FooterLogoH1,
	FooterMenuDD,
	FooterMenuDiv,
	FooterMenuDl,
} from './Footer.style';
import FooterMenuText from './FooterMenuText/FooterMenuText';

const utilMenus = {
	about: ['댕냥 커넥트란?', '이용 안내'],
	qna: ['자주하는 질문', 'Q & A', '고객센터'],
};

const Footer = () => {
	const { $isMaxWidth, $isTablet, $isMobile } = useResponsive();
	const id = 3;
	return (
		<FooterDiv>
			<FooterInnerDiv $isMaxWidth={$isMaxWidth} $isMobile={$isMobile}>
				<FooterFlexDiv $isMobile={$isMobile}>
					<FooterLogoH1 $isMobile={$isMobile}>
						<img src="/assets/LOGO(footer).svg" alt="" />
					</FooterLogoH1>
					<FooterMenuDiv $isMobile={$isMobile}>
						<FooterMenuDl $isMobile={$isMobile}>
							<FooterDt $isTablet={$isTablet} $isMobile={$isMobile}>
								ABOUT US
							</FooterDt>
							{utilMenus.about.map((text, index) => (
								<FooterMenuDD $isMobile={$isMobile} key={index}>
									{text}
								</FooterMenuDD>
							))}
						</FooterMenuDl>
						<FooterMenuDl $isMobile={$isMobile}>
							<FooterDt $isTablet={$isTablet} $isMobile={$isMobile}>
								사이트 맵
							</FooterDt>
							<FooterMenuText
								key={1}
								text="새로운 가족 찾기"
								moveTo="/newFamily"
							/>
							<FooterMenuText
								key={2}
								text="입양 후기"
								moveTo="/adoptionReviews"
							/>
							<FooterMenuText key={3} text="커뮤니티" moveTo="/community" />
							<FooterMenuText
								key={4}
								text="마이페이지"
								moveTo={`/users/${id}`}
							/>
						</FooterMenuDl>
						<FooterMenuDl $isMobile={$isMobile}>
							<FooterDt $isTablet={$isTablet} $isMobile={$isMobile}>
								문의하기
							</FooterDt>
							{utilMenus.qna.map((text, index) => (
								<FooterMenuDD $isMobile={$isMobile} key={index}>
									{text}
								</FooterMenuDD>
							))}
						</FooterMenuDl>
					</FooterMenuDiv>
				</FooterFlexDiv>
				<FooterCopyrightDiv $isMobile={$isMobile}>
					<FooterCopyrightP $isMobile={$isMobile}>
						Copyright© All right reserved by 댕냥커넥트.
					</FooterCopyrightP>
				</FooterCopyrightDiv>
			</FooterInnerDiv>
		</FooterDiv>
	);
};

export default Footer;
