import styled from 'styled-components';

type ChatWapperProps = {
	$isMaxWidth?: boolean;
	$isMobile?: boolean;
};

export const ChatBoxWrapperDiv = styled.div`
	width: 100%;
	margin-top: 64px;
`;
export const ChatBoxInnerdiv = styled.div<ChatWapperProps>`
	display: flex;
	max-width: 1320px;
	width: ${(props) => (props.$isMaxWidth ? 'calc(100%-60px)' : '100%')};
	padding: ${(props) => (props.$isMobile ? '0 0 200px 0' : '30px 0')};
	margin: ${(props) => (props.$isMaxWidth ? '0 30px' : 'auto')};
`;
export const NoneChatListDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100vh - 64px);
`;
