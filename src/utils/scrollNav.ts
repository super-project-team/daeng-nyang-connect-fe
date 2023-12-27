import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const scrollNav = () => {
	const location = useLocation();

	const [scrollPosition, setScrollPosition] = useState(0);
	const [transparent, setTransparent] = useState(true);

	const updateScroll = () => {
		setScrollPosition(window.scrollY || document.documentElement.scrollTop);
	};

	useEffect(() => {
		window.addEventListener('scroll', updateScroll);
	}, []);

	useEffect(() => {
		if (location.pathname === '/' && scrollPosition < 100) setTransparent(true);
		else setTransparent(false);
	}, [scrollPosition]);
	return transparent;
};

export default scrollNav;
