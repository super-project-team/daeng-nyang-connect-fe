import styled from 'styled-components';

type SectionProps = {
	$isMobile?: boolean;
	$isMaxWidth?: boolean;
};

export const MainSection = styled.section<SectionProps>`
	max-width: 1320px;
	width: calc(100% -60px);
	padding: ${(props) => (props.$isMobile ? '100px 0 200px' : '200px 0 260px')};
	margin: ${(props) => (props.$isMaxWidth ? '0 30px' : 'auto')};
	text-align: center;
`;
export const MainSectionH2 = styled.h2<SectionProps>`
	margin-bottom: ${(props) => (props.$isMobile ? '40px' : '120px')};
	font-size: ${(props) => (props.$isMobile ? '16px' : '28px')};
	font-weight: 400;
	line-height: 30px;
`;
