import { styled } from 'styled-components';

interface ResponsiveProps {
	$isMobile: boolean;
	$isMaxWidth: boolean;
}

export const AlarmContainer = styled.div<ResponsiveProps>`
	max-width: 1320px;
	width: 100%;
	height: 40vh;
	padding: ${(props) =>
		props.$isMobile ? '0 10px' : props.$isMaxWidth ? '0 30px' : '0'};
	margin: ${(props) =>
		props.$isMobile ? '70px auto 100px auto' : '120px auto 150px auto'};
`;

export const AlarmTitle = styled.div<ResponsiveProps>`
	padding-bottom: 10px;
	font-size: ${(props) => (props.$isMobile ? '16px' : '24px')};
	font-weight: 400;
	border-bottom: 1px solid var(--color-light-salmon);
`;

export const AlarmItemBox = styled.div<ResponsiveProps>`
	width: ${(props) => (props.$isMaxWidth ? '100%' : '1320px')};
	padding: ${(props) =>
		props.$isMobile ? '0 10px' : props.$isMaxWidth ? '0' : '0 30px'};
	margin: ${(props) =>
		props.$isMobile ? '50px auto 100px auto' : '120px auto 150px auto'};
`;
