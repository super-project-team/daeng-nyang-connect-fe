import { Outlet } from 'react-router-dom';
import { Article } from './MyPets.style';
import { useResponsive } from '../../hooks/useResponsive';

const MyPets = () => {
	const { $isMobile } = useResponsive();

	return (
		<Article $isMobile={$isMobile}>
			<Outlet />
		</Article>
	);
};

export default MyPets;
