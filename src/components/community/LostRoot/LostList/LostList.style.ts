import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const LostLi = styled.li<NavOptionProps>`
	position: relative;
	width: 100%;
	height: ${(props) => (props.$isMobile ? '350px' : '600px')};
	border: 1px solid var(--color-peach);
	border-radius: 8px;
	cursor: pointer;
`;

export const ImgWrap = styled.div<NavOptionProps>`
	display: flex;
	justify-content: center;
	height: ${(props) => (props.$isMobile ? '35%' : '45%')};
	border-radius: 8px 8px 0px 0px;
	overflow: hidden;

	& img {
		width: 100%;
		height: 100%;
		border-radius: 8px 8px 0px 0px;
		transition: transform 0.7s ease;
	}

	& img:hover {
		transform: scale(1.05);
	}

	.default-image {
		padding: 20px;
		background-color: rgba(255, 127, 80, 0.1);
	}
`;

export const TextWrap = styled.div<NavOptionProps>`
	height: ${(props) => (props.$isMobile ? '130px' : '180px')};
	padding: 16px;
	font-size: ${(props) =>
		props.$isTablet ? '15px' : props.$isMobile ? '12px' : '16px'};
	line-height: 1.3;

	& div {
		margin-bottom: ${(props) =>
			props.$isTablet ? '12px' : props.$isMobile ? '8px' : '16px'};
	}

	& p {
		height: 50%;
		margin-top: ${(props) =>
			props.$isTablet ? '12px' : props.$isMobile ? '8px' : '16px'};
		line-height: 1.5;
	}
`;

export const ButtonWrap = styled.div<NavOptionProps>`
	position: absolute;
	bottom: 8px;
	right: 4px;
	text-align: right;
	margin: ${(props) =>
		props.$isMobile ? '0px 4px 0px 0px' : '0px 10px 10px 0px'};

	& button:hover {
		background-color: var(--color-light-salmon);
		color: var(--color-peach);
	}
`;

export const Button = styled.button<NavOptionProps>`
	padding: ${(props) =>
		props.$isTablet ? '4px 16px' : props.$isMobile ? '2px 4px' : '4px 16px'};
	border: 1px solid var(--color-light-salmon);
	border-radius: 4px;
	outline: none;
	background-color: transparent;
	font-size: ${(props) =>
		props.$isTablet ? '15px' : props.$isMobile ? '12px' : '16px'};
	cursor: pointer;
`;

export const PlaceText = styled.div<NavOptionProps>`
	font-size: ${(props) => (props.$isMobile ? '11px' : '16px')};
`;

export const DateText = styled.div<NavOptionProps>`
	font-size: ${(props) => (props.$isMobile ? '11px' : '16px')};
`;
