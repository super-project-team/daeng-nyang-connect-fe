import React from 'react';
import { Wrapper } from './MyPost.style';
import { useResponsive } from '../../../hooks/useResponsive';

const MyPost = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	return <Wrapper>내가 쓴 글</Wrapper>;
};

export default MyPost;
