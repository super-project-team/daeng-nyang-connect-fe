import { Outlet } from 'react-router-dom';
import { Article } from './Tips.style';
import { useResponsive } from '../../hooks/useResponsive';

const Tips = () => {
	const { $isMobile } = useResponsive();

	return (
		<Article $isMobile={$isMobile}>
			<Outlet />
		</Article>
	);
};

export default Tips;
