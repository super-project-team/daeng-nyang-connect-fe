import styled from 'styled-components';

type ReviewCardProps = {
	$isMobile: boolean;
};

export const CardListUl = styled.ul<ReviewCardProps>`
	display: grid;
	grid-template-columns: ${(props) => (props.$isMobile ? '1fr' : '1fr 1fr')};
	gap: 30px;
	margin-bottom: 80px;
`;
