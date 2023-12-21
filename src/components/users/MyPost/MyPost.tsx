import React, { useState, useEffect } from 'react';
import { Wrapper } from './MyPost.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { getMyBoard } from '../../../api/myPageApi';
import { PostBoard } from '../../../types/BoardTypes';

const MyPost: React.FC = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const getMyPost = async () => {
		try {
			const response = await getMyBoard();
			console.log(response);
		} catch (error) {
			// 에러 처리
		}
	};

	useEffect(() => {
		getMyPost();
	}, []);

	return <Wrapper></Wrapper>;
};

export default MyPost;
