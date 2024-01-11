import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const Container = styled.div<NavOptionProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	width: ${(props) => (props.$isMobile ? '80%' : '500px')};
	height: 150px;
	border: 1px solid var(--color-peach);
	border-radius: 8px;
	background-color: white;
	z-index: 10000;
`;

export const TopBar = styled.div`
	width: 100%;
	height: 30px;
	border-radius: 8px 8px 0px 0px;
	background-color: var(--color-light-salmon);
`;

export const InfoWrap = styled.div<NavOptionProps>`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 70%;
	height: 70%;

	p {
		font-size: ${(props) => (props.$isMobile ? '14px' : '16px')};
	}
`;

export const ButtonWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export const Button = styled.button<NavOptionProps>`
	width: 40%;
	border: 1px solid var(--color-light-salmon);
	border-radius: 6px;
	font-size: ${(props) => (props.$isMobile ? '12px' : '14px')};
`;
