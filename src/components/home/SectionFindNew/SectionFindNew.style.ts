import styled from 'styled-components';

type FindNewProps = {
	$isMobile?: boolean;
	$isMaxWidth?: boolean;
};

export const FindNewSection = styled.section<FindNewProps>`
	position: relative;
	padding: ${(props) => (props.$isMobile ? '40px 30px 100px' : '80px 0 260px')};
	background-color: #ffe1d6;
`;
export const FindNewTitleDiv = styled.div<FindNewProps>`
	display: flex;
	justify-content: space-between;
	align-items: start;
	max-width: 1320px;
	width: ${(props) => (props.$isMaxWidth ? 'calc(100% - 60px)' : '100%')};
	margin: ${(props) => (props.$isMaxWidth ? '0 30px' : 'auto')};
`;
export const CardListUl = styled.ul`
	display: flex;
	justify-content: space-between;
`;