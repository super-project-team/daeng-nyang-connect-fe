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
