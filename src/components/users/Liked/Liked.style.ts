import styled from 'styled-components';

interface ResponsiveProps {
	$isMobile: boolean;
	$isTablet: boolean;
	$isPc: boolean;
	$isMaxWidth: boolean;
}

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 1380px;
	height: 100vh;
`;

export const ListWrapper = styled.div`
	vertical-align: baseline;
`;

export const ListDiv = styled.div<ResponsiveProps>`
	/* ${(props) => (props.$isMobile ? '200px' : '427px')}; */
	width: ${(props) => (props.$isMobile ? '272px' : '472px')};
	height: ${(props) => (props.$isMobile ? '36px' : '48px')};
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	font-weight: 500;
	justify-content: space-between;
	display: flex;
	align-items: center;
	margin-top: 16px;
	margin-left: ${(props) => (props.$isMobile ? '0px' : '16px')};
	padding-left: 20px;
	padding-right: 8px;
	box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
`;
