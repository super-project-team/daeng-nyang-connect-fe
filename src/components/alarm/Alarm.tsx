/* eslint-disable react/prop-types */
import { useResponsive } from '../../hooks/useResponsive';
import { AlarmContainer, AlarmItemBox, AlarmTitle } from './Alarm.style';

interface Re {
	$isMobile: boolean;
	$isMaxWidth: boolean;
}

const Alarm: React.FC<Re> = () => {
	const { $isMobile, $isMaxWidth } = useResponsive();

	return (
		<AlarmContainer $isMobile={$isMobile} $isMaxWidth={$isMaxWidth}>
			<AlarmTitle $isMobile={$isMobile} $isMaxWidth={$isMaxWidth}>
				내소식
			</AlarmTitle>
			<AlarmItemBox $isMobile={$isMobile} $isMaxWidth={$isMaxWidth}>
				<div></div>
			</AlarmItemBox>
		</AlarmContainer>
	);
};

export default Alarm;
