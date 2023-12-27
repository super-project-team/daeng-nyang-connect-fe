import { Outlet } from 'react-router-dom';
import { Article } from './Losts.style';
import { useResponsive } from '../../hooks/useResponsive';

const Losts = () => {
	const { $isMobile } = useResponsive();

	return (
		<Article $isMobile={$isMobile}>
			<Outlet />
		</Article>
	);
};

export default Losts;
