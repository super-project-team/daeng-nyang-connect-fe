import styled, { css } from 'styled-components';

interface BtnProps {
	padding?: string;
	$isMobile?: boolean;
}

export const SalmonBtn = styled.button<BtnProps>`
	border-radius: 8px;
	padding: ${(props) => (props.$isMobile ? '10px 80px' : '8px 200px')};
	background-color: var(--color-light-salmon);
	color: #fff;
	font-size: ${(props) => (props.$isMobile ? '12px' : '18px')};
	cursor: pointer;
`;
