import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const MyPetLists = styled.ul<NavOptionProps>`
	display: grid;
	grid-template-columns: ${(props) =>
		props.$isTablet
			? 'repeat(2, 1fr)'
			: props.$isMobile
			  ? 'repeat(2, 1fr)'
			  : 'repeat(3, 1fr)'};
	grid-gap: 10px;
	list-style: none;
	width: 100%;
	padding: 0;
`;
