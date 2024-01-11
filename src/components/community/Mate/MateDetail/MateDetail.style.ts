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

export const ImageAndTextWrap = styled.div<NavOptionProps>`
	display: flex;
	flex-direction: ${(props) => (props.$isMobile ? 'column' : 'row')};
	min-height: ${(props) => (props.$isMobile ? '500px' : '450px')};
	height: auto;
	padding: 12px 0px;
	margin-bottom: 12px;
	border-bottom: 1px solid var(--color-light-salmon);
`;

export const ImageWrap = styled.div<NavOptionProps>`
	width: ${(props) => (props.$isMobile ? 'auto' : '50%')};
	margin: 10px 10px 10px 12px;

	& img {
		width: 100%;
		height: ${(props) => (props.$isMobile ? '300px' : '480px')};
		max-width: 100%;
	}
`;

export const SubTitle = styled.h3`
	font-size: 18px;
	font-weight: 600;
`;

export const TextBox = styled.div<NavOptionProps>`
	width: ${(props) => (props.$isMobile ? 'auto' : '50%')};
	padding: 20px;
	margin: ${(props) =>
		props.$isTablet ? '8px' : props.$isMobile ? '4px' : '10px'};

	& h3 {
		margin-bottom: 20px;
		font-size: ${(props) =>
			props.$isTablet ? '18px' : props.$isMobile ? '16px' : '20px'};
		font-weight: 400;
	}

	& p {
		margin-top: 8px;
		font-size: ${(props) =>
			props.$isTablet ? '14px' : props.$isMobile ? '12px' : '16px'};
		line-height: 1.5;
	}
`;

export const Paragraph = styled.div`
	line-height: 1.5;
`;

export const PlaceWrap = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 12px;
`;

export const Place = styled.div<NavOptionProps>`
	margin-left: 12px;
	font-size: ${(props) =>
		props.$isTablet ? '14px' : props.$isMobile ? '12px' : '16px'};
	font-weight: 400;
`;

export const Description = styled.div<NavOptionProps>`
	display: inline-block;
	padding: 8px 12px;
	border-radius: 6px;
	background-color: var(--color-light-blue);
	font-size: ${(props) =>
		props.$isTablet ? '14px' : props.$isMobile ? '12px' : '16px'};
	font-weight: 300;
`;

export const Text = styled.div<NavOptionProps>`
	margin-top: 8px;
	font-size: ${(props) =>
		props.$isTablet ? '14px' : props.$isMobile ? '12px' : '16px'};
	line-height: 1.5;
`;
