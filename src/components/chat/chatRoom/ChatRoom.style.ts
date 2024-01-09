import styled from 'styled-components';

type ChatRoomProps = {
	$isMobile: boolean;
};

export const ChatRoomDiv = styled.div<ChatRoomProps>`
	position: relative;
	width: 100%;
	height: ${(props) => (props.$isMobile ? '100vh' : '900px')};
	border: ${(props) =>
		props.$isMobile ? null : '1px solid var(--color-light-salmon)'};
	border-radius: 20px;
	margin-top: ${(props) => (props.$isMobile ? '45px' : null)};
`;

export const ChatBubbleUl = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: end;
	margin: 30px 30px;
`;

export const ChatBubbleLi = styled.li`
	width: max-content;
	padding: 8px 12px;
	margin-bottom: 10px;
	border-radius: 15px;
	background-color: var(--color-light-salmon);
	color: #fff;
	list-style: none;
`;
