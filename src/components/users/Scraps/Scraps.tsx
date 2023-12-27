import React from 'react';
import { Wrapper } from './Scrpas.style';
import { useResponsive } from '../../../hooks/useResponsive';

const Scraps = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	return <Wrapper>스크랩한 개시물</Wrapper>;
};

export default Scraps;
