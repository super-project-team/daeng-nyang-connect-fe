import React, { useEffect, useState } from 'react';
import UserInfo from '../UserInfo/UserInfo';

import { useResponsive } from '../../../hooks/useResponsive';
import {
	CategoryButtonDiv,
	CategoryDiv,
	TitleDiv,
	Wrapper,
} from './User.style';
import MyPost from '../MyPost/MyPost';
import Liked from '../Liked/Liked';
import Scraps from '../Scraps/Scraps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootUserState } from '../../../slice/userSlice';

const User = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector((state: RootUserState) => state.user);

	useEffect(() => {
		if (!isLoggedIn) {
			redirectToLoginPage();
		}
	}, []);

	const redirectToLoginPage = () => {
		navigate('/login');
	};

	const [openMyInfo, setOpenMyInfo] = useState(true);
	const [openMyPost, setOpenMyPost] = useState(false);
	const [openMyScraps, setOpenMyScraps] = useState(false);
	const [openMyLiked, setOpenMyLiked] = useState(false);

	const openMyInfoHandler = () => {
		setOpenMyInfo(true);
		setOpenMyPost(false);
		setOpenMyScraps(false);
		setOpenMyLiked(false);
	};

	const openMyPostHandler = () => {
		setOpenMyInfo(false);
		setOpenMyPost(true);
		setOpenMyScraps(false);
		setOpenMyLiked(false);
	};

	const openMyScrapsHandler = () => {
		setOpenMyInfo(false);
		setOpenMyPost(false);
		setOpenMyScraps(true);
		setOpenMyLiked(false);
	};

	const openMyLikedHandler = () => {
		setOpenMyInfo(false);
		setOpenMyPost(false);
		setOpenMyScraps(false);
		setOpenMyLiked(true);
	};

	return (
		<Wrapper>
			<TitleDiv
				$isMobile={$isMobile}
				$isTablet={$isTablet}
				$isPc={$isPc}
				$isMaxWidth={$isMaxWidth}>
				마이페이지
			</TitleDiv>
			<CategoryDiv
				$isMobile={$isMobile}
				$isTablet={$isTablet}
				$isPc={$isPc}
				$isMaxWidth={$isMaxWidth}>
				<CategoryButtonDiv
					onClick={openMyInfoHandler}
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}>
					프로필
				</CategoryButtonDiv>
				<CategoryButtonDiv
					onClick={openMyPostHandler}
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}>
					내가 쓴 글
				</CategoryButtonDiv>
				<CategoryButtonDiv
					onClick={openMyScrapsHandler}
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}>
					스크랩
				</CategoryButtonDiv>
				<CategoryButtonDiv
					onClick={openMyLikedHandler}
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}>
					좋아요
				</CategoryButtonDiv>
			</CategoryDiv>
			{openMyInfo && <UserInfo />}
			{openMyPost && <MyPost />}
			{openMyScraps && <Scraps />}
			{openMyLiked && <Liked />}
		</Wrapper>
	);
};

export default User;
