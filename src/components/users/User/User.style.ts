import styled from 'styled-components';

interface ResponsiveProps {
	$isMobile: boolean;
	$isTablet: boolean;
	$isPc: boolean;
	$isMaxWidth: boolean;
}

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const TitleDiv = styled.div<ResponsiveProps>`
	width: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 80px;
	font-size: ${(props) => (props.$isMobile ? '20px' : '25px')};
	font-weight: 500;
	padding-bottom: 30px;
	border-bottom: 1.5px solid var(--color-);
`;

export const CategoryDiv = styled.div<ResponsiveProps>`
	max-width: 1320px;
	width: 60%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CategoryButtonDiv = styled.div<ResponsiveProps>`
	font-weight: 500;
	margin-right: 30px;
	&:hover {
		cursor: pointer;
	}
`;
