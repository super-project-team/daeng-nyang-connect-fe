import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const MateLi = styled.li<NavOptionProps>`
	display: flex;
	flex-direction: column;
	height: ${(props) => (props.$isMobile ? '200px' : '250px')};
	padding: ${(props) => (props.$isMobile ? '8px' : '16px')};
	border: 1px solid var(--color-peach);
	border-radius: 8px;

	& p {
		line-height: 1.5;
	}
`;

export const SubNav = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`;

export const UserWrap = styled.div<NavOptionProps>`
	display: flex;
	align-items: center;

	& div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: ${(props) =>
			props.$isTablet ? '28px' : props.$isMobile ? '24px' : '30px'};
		height: ${(props) =>
			props.$isTablet ? '28px' : props.$isMobile ? '24px' : '30px'};
		margin-right: ${(props) =>
			props.$isTablet ? '6px' : props.$isMobile ? '2px' : '8px'};
		border: 1px solid black;
		border-radius: 50%;
		cursor: pointer;
	}

	& span {
		margin-left: 8px;
		font-size: ${(props) =>
			props.$isTablet ? '14px' : props.$isMobile ? '12px' : '16px'};
	}
`;

export const KebabWrap = styled.div`
	cursor: pointer;
`;

export const PlaceWrap = styled.div<NavOptionProps>`
	margin-bottom: 16px;
	font-size: ${(props) =>
		props.$isTablet ? '14px' : props.$isMobile ? '12px' : '16px'};
`;

export const ButtonWrap = styled.div<NavOptionProps>`
	text-align: right;

	& button:hover {
		background-color: var(--color-light-salmon);
		color: var(--color-peach);
	}
`;

export const Button = styled.button<NavOptionProps>`
	padding: ${(props) =>
		props.$isTablet ? '4px 16px' : props.$isMobile ? '2px 4px' : '4px 16px'};
	border-radius: 4px;
	border: 1px solid var(--color-light-salmon);
	outline: none;
	background-color: transparent;
	font-size: ${(props) =>
		props.$isTablet ? '15px' : props.$isMobile ? '12px' : '16px'};
	cursor: pointer;
`;

export const TextWrap = styled.div<NavOptionProps>`
	height: ${(props) => (props.$isMobile ? '70%' : '80%')};
	cursor: pointer;
	font-size: ${(props) =>
		props.$isTablet ? '14px' : props.$isMobile ? '12px' : '16px'};
`;
