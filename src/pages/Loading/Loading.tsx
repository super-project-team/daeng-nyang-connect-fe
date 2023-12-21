import { useResponsive } from '../../hooks/useResponsive';
import { LoadingContents, LoadingText, LoadingWrap } from './Loading.style';
import movingPaw from './moving_paw.gif';

const Loading = () => {
	const { $isMobile } = useResponsive();

	return (
		<LoadingWrap $isMobile={$isMobile}>
			<LoadingContents $isMobile={$isMobile}>
				<LoadingText $isMobile={$isMobile}>LOADING . . .</LoadingText>
				<img src={movingPaw} alt="" />
			</LoadingContents>
		</LoadingWrap>
	);
};

export default Loading;
