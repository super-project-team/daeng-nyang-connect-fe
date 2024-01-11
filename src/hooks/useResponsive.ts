import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
	const $isMaxWidth = useMediaQuery({ query: '(max-width:1380px)' });
	const $isPc = useMediaQuery({ query: '(min-width: 1025px)' });
	const $isTablet = useMediaQuery({
		query: '(min-width: 768px) and (max-width: 1024px)',
	});
	const $isMobile = useMediaQuery({ query: '(max-width: 767px)' });

	return { $isPc, $isTablet, $isMobile, $isMaxWidth };
};
