import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const Article = styled.article<NavOptionProps>`
	margin-top: ${(props) => (props.$isMobile ? '0px' : '10px')};
`;

export const TipsNav = styled.nav<NavOptionProps>`
	display: flex;
	width: 100%;
	padding-bottom: 10px;
	border-bottom: 1px solid var(--color-light-salmon);
	font-size: ${(props) => (props.$isMobile ? '14px' : '16px')};

	& > div {
		&:first-child {
			flex: 5;
			text-align: center;
		}

		&:nth-child(2) {
			flex: 1.75;
			text-align: center;
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

export const TipLists = styled.ul<NavOptionProps>`
	margin-top: ${(props) => (props.$isMobile ? '8px' : '20px')};
`;
