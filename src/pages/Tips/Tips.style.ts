import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const Article = styled.article<NavOptionProps>`
	width: ${(props) => (props.$isMobile ? '100%' : '85%')};
	padding: 10px;
`;
