import styled from 'styled-components';

interface ResponsiveProps {
	$isMobile: boolean;
	$isTablet: boolean;
	$isPc: boolean;
	$isMaxWidth: boolean;
}

export const LoginStatePopup = styled.div<ResponsiveProps>`
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: ${(props) => (props.$isMobile ? '320px' : '400px')};
	height: ${(props) => (props.$isMobile ? '250px' : '150px')};
	border: 1px solid var(--color-light-salmon);
	border-radius: 5px;
	background: #fff;
	box-shadow: 0.25rem 0.25rem 0.25rem #00000010;
	z-index: 100;
	overflow: hidden;
	font-size: 16px;

	& > div:first-child {
		width: 100%;
		height: 30px;
		background: var(--color-light-salmon);
	}

	& > div:nth-child(2) {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}
`;

export const LoginStateButtonBox = styled.div<ResponsiveProps>`
	display: flex;
	flex-direction: ${(props) => (props.$isMobile ? 'column' : 'row')};
	gap: ${(props) => (props.$isMobile ? '10px' : '0')};
	justify-content: space-evenly;
	align-items: ${(props) => (props.$isMobile ? 'center' : 'unset')};
	width: 100%;

	& button {
		width: ${(props) => (props.$isMobile ? '80%' : '80px')};
		padding: 4px;
		border: 1px solid var(--color-light-salmon);
		border-radius: 5px;
		font-size: 12px;
	}
`;
