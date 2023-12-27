import styled, { css } from 'styled-components';

interface NavProps {
	$isHome?: string;
	$isMaxWidth?: boolean;
	$isMobile?: boolean;
}

export const HeaderDiv = styled.div<NavProps>`
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	width: 100%;
	height: ${(props) => (props.$isMobile ? '50px' : '64px')};
	background-color: #fff;
	box-shadow: 0 0 10px 0 #9e848d50;
	transition: all 0.3s ease-in-out;
	${(props) =>
		props.$isHome &&
		!props.$isMobile &&
		css`
			background-color: rgba(255, 255, 255, 0.8);
		`}
`;
export const HeaderContenstDiv = styled.div<NavProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: 1320px;
	width: 100%;
	height: 100%;
	margin: auto;
	padding: ${(props) =>
		props.$isMobile ? '0 10px' : props.$isMaxWidth ? '0 30px' : '0'};
`;
export const HeaderNav = styled.nav`
	display: flex;
	align-items: center;
`;
export const LogoH1 = styled.h1<NavProps>`
	width: ${(props) => (props.$isMobile ? '55%' : null)};
	margin-right: 26px;
	cursor: pointer;
	img {
		width: 100%;
	}
`;
export const NavUl = styled.ul`
	display: flex;
	align-items: center;
`;
export const NavLi = styled.li`
	margin-right: 20px;
	font-size: 18px;
	cursor: pointer;
	.nav {
		font-weight: 400;
		transition: all 0.4s ease;
		&:hover {
			color: var(--color-light-salmon);
		}
	}
	.m-nav {
		font-size: 16px;
		font-weight: 400;
		color: #fff;
		transition: all 0.4s ease;
		&:hover {
			color: var(--color-deep-blue);
		}
	}
`;
export const UtilDl = styled.dl`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export const UtilDd = styled.dd<NavProps>`
	margin-left: 4px;
	width: ${(props) => (props.$isMobile ? '22px' : '28px')};
	height: ${(props) => (props.$isMobile ? '22px' : '28px')};
	cursor: pointer;
	svg {
		width: 100%;
		height: 100%;
		stroke-width: ${(props) => (props.$isMobile ? '1.4' : '1.6')};
	}
`;
