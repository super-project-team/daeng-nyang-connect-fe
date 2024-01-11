import styled from 'styled-components';

type FindNewProps = {
	$isMobile?: boolean;
	$isMaxWidth?: boolean;
};

export const FindNewSection = styled.section<FindNewProps>`
	position: relative;
	padding: ${(props) =>
		props.$isMobile ? '100px 30px 180px' : '180px 0 240px'};
	background-color: #ffe1d6;
`;
export const FindNewTitleDiv = styled.div<FindNewProps>`
	margin: auto;
	text-align: center;
	max-width: 1320px;
	width: ${(props) => (props.$isMobile ? '100%' : 'calc(100% - 60px)')};
	margin: ${(props) => (props.$isMobile ? '0' : 'auto')};
`;
export const FindNewMoreBtnDiv = styled(FindNewTitleDiv)<FindNewProps>`
	margin-top: ${(props) => (props.$isMobile ? '60px' : '80px')};
`;
export const CardListUl = styled.ul`
	display: flex;
	justify-content: space-between;
`;
