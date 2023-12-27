import { Outlet } from 'react-router-dom';
import { Article } from './Mates.style';
import { useResponsive } from '../../hooks/useResponsive';

const Mates = () => {
	const { $isMobile } = useResponsive();

	return (
		<Article $isMobile={$isMobile}>
			<Outlet />
		</Article>
	);
};

export default Mates;
