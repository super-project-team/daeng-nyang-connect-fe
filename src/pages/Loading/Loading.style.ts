import styled from 'styled-components';

interface LoadingProps {
	$isMobile?: boolean;
}

export const LoadingWrap = styled.div<LoadingProps>`
	position: absolute;
	z-index: 500;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: #fff;
	img {
		width: ${(props) => (props.$isMobile ? '200px' : '300px')};
	}
`;
export const LoadingContents = styled.div<LoadingProps>`
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translateX(-50%);
`;
export const LoadingText = styled.p<LoadingProps>`
	position: relative;
	top: ${(props) => (props.$isMobile ? '30px' : ' 65px')};
	left: ${(props) => (props.$isMobile ? '40px' : '80px')};
	font-size: ${(props) => (props.$isMobile ? '24px' : '36px')};
	font-weight: 400;
	color: var(--color-light-salmon);
	letter-spacing: -0.6px;
`;
