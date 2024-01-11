import styled, { css } from 'styled-components';

interface ChatInfoProps {
	$isMobile: boolean;
}

const FlexStyle = css`
	display: flex;
	align-items: center;
	width: 100%;
`;

export const ChatListLi = styled.li<ChatInfoProps>`
	padding: ${(props) => (props.$isMobile ? '12px' : '15px')};
	margin-bottom: 2px;
	border-radius: 8px;
	background-color: #fff;
	box-shadow: 0 1px 3px 0 var(--color-peach);
	font-size: ${(props) => props.$isMobile && '12px'};
	${FlexStyle}
	&.active {
		background-color: var(--color-peach);
	}
`;

export const ChatInfoDiv = styled.div`
	flex: 1 0 auto;
	line-height: 1.4;
`;
export const ChatInfoEachDiv = styled.div`
	${FlexStyle}
	justify-content: space-between;
	&.first-box {
		margin-bottom: 3px;
	}
`;
export const NoneReadCountEm = styled.em<ChatInfoProps>`
	width: ${(props) => (props.$isMobile ? '14px' : '24px')};
	height: ${(props) => (props.$isMobile ? '14px' : '24px')};
	border-radius: 50%;
	background-color: #eb6c6c;
	color: #fff;
	font-size: ${(props) => props.$isMobile && '10px'};
	text-align: center;
`;
export const ChatTime = styled.time<ChatInfoProps>`
	font-size: ${(props) => (props.$isMobile ? '10px' : '14px')};
`;
