import Communities from './Communities/Communities';
import { CommunityUl } from './SectionCommunity.style';
import { MainSection, MainSectionH2 } from './../Section.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { PiPawPrintFill } from 'react-icons/pi';

const SectionCommunity = () => {
	const { $isMobile } = useResponsive();
	return (
		<MainSection $isMobile={$isMobile}>
			<MainSectionH2 $isMobile={$isMobile}>댕냥 톡톡</MainSectionH2>
			<CommunityUl>
				<Communities
					title="나의 댕냥이"
					img="assets/community1.jpg"
					to="/community/myPets">
					귀여운 반려동물 자랑대회
				</Communities>
				<Communities
					title="댕냥 꿀팁"
					img="assets/community2.jpg"
					to="/community/tips">
					용품 및 병원 리뷰 꿀팁
				</Communities>
				<Communities
					title="댕냥 메이트"
					img="assets/community3.jpg"
					to="/community/mates">
					우리 메이트 하자
				</Communities>
				<Communities
					title="댕냥 미아센터"
					img="assets/community4.jpg"
					to="/community/losts">
					댕냥이가 길을 잃었어요
				</Communities>
			</CommunityUl>
		</MainSection>
	);
};

export default SectionCommunity;
