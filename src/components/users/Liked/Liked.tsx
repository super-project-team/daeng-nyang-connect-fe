import React from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { Wrapper } from './Liked.style';

const Liked = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	return <Wrapper>좋아요한 개시물</Wrapper>;
};

export default Liked;
