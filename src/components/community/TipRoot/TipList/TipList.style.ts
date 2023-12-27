import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const TipLi = styled.li<NavOptionProps>`
	display: flex;
	list-style: none;
	width: 100%;
	padding: 20px 0px;
	border-bottom: 1px solid var(--color-peach);
	font-size: ${(props) =>
		props.$isMobile ? '10px' : props.$isTablet ? '14px' : '16px'};
	cursor: pointer;

	&:hover {
		background-color: var(--color-peach);
		color: white;
	}

	& > div {
		&:first-child {
			flex: 5;
			padding-left: 10px;
			font-size: ${(props) =>
				props.$isMobile ? '12px' : props.$isTablet ? '14px' : '16px'};
		}

		&:nth-child(2) {
			flex: 1.75;
			text-align: center;
			margin-right: px;
		}

		&:nth-child(3) {
			flex: 1.75;
			text-align: center;
		}

		&:last-child {
			flex: 1.5;
			text-align: center;
		}
	}
`;
