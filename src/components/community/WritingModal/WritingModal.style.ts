import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const WritingModalSection = styled.section<NavOptionProps>`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: ${(props) => (props.$isMobile ? '100%' : '550px')};
	height: ${(props) => (props.$isMobile ? '100%' : '93%')};
	margin-top: ${(props) => (props.$isMobile ? '0' : '30px')};
	max-height: ${(props) => (props.$isMobile ? '100%' : '690px')};
	background-color: white;
	border-radius: ${(props) => (props.$isMobile ? '0px' : '8px')};
	z-index: 1000;

	@media (max-height: 724px) {
		height: ${(props) => (props.$isMobile ? '100%' : '90%')};
		min-height: 650px;
	}
`;
