/* eslint-disable react/prop-types */
import { useQuery } from 'react-query';
import { useResponsive } from '../../hooks/useResponsive';
import { AlarmContainer, AlarmItemBox, AlarmTitle } from './Alarm.style';
import { NotifyLike } from '../../api/alarmApi';

interface ResponsiveProps {
	$isMobile: boolean;
	$isMaxWidth: boolean;
}

const Alarm: React.FC<ResponsiveProps> = () => {
	const { $isMobile, $isMaxWidth } = useResponsive();

	const { data: items, refetch } = useQuery(['NotifyLike'], NotifyLike);

	return (
		<AlarmContainer $isMobile={$isMobile} $isMaxWidth={$isMaxWidth}>
			<AlarmTitle $isMobile={$isMobile} $isMaxWidth={$isMaxWidth}>
				내소식
			</AlarmTitle>
			<AlarmItemBox $isMobile={$isMobile} $isMaxWidth={$isMaxWidth}>
				{items && Array.isArray(items) ? (
					items?.map((item: any, index) => <div key={index}></div>)
				) : (
					<p className="">새로운 알람이 없습니다</p>
				)}
			</AlarmItemBox>
		</AlarmContainer>
	);
};

export default Alarm;
