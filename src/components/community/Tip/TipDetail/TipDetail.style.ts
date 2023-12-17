import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const CommentWrap = styled.div<NavOptionProps>`
	width: 100%;
	padding: ${(props) => (props.$isMobile ? '0px' : '8px 16px')};
	padding-bottom: ${(props) => (props.$isMobile ? '60px' : '60px')};
`;

export const SubTitle = styled.h3`
	font-size: 18px;
	font-weight: 600;
`;

export const TextBox = styled.div<NavOptionProps>`
	height: auto;
	padding: 20px;
	margin-bottom: 12px;
	border-bottom: 1px solid var(--color-light-salmon);

	& li {
		height: ${(props) => (props.$isMobile ? '200px' : 'auto')};
		width: 100%;
		margin-bottom: 10px;

		& img {
			width: 100%;
			height: 100%;
		}
	}
`;

export const Paragraph = styled.div<NavOptionProps>`
	line-height: 1.5;
	font-size: ${(props) =>
		props.$isTablet ? '14px' : props.$isMobile ? '12px' : '16px'};
`;

export const Title = styled.h1<NavOptionProps>`
	margin-bottom: 12px;
	font-size: ${(props) =>
		props.$isTablet ? '24px' : props.$isMobile ? '18px' : '28px'};
	font-weight: bold;
`;
