import styled from 'styled-components';
import { FlexStyle } from '../../ChatContentsBox.style';

type ChatRoomHeaderProps = {
	$isMobile: boolean;
};

export const ChatRoomHeaderDiv = styled.div<ChatRoomHeaderProps>`
	padding: 0 14px;
	.more-btn {
		width: ${(props) => (props.$isMobile ? '20px' : '30px')};
		height: ${(props) => (props.$isMobile ? '20px' : '30px')};
		color: #f79698;
	}
	.back-icon {
		width: 20px;
		height: 20px;
		color: var(--color-light-salmon);
	}
`;
export const ChatRoomHeaderBdDiv = styled.div`
	${FlexStyle}
	justify-content: space-between;
	padding: 18px 10px 10px;
`;
export const UserDiv = styled.div<ChatRoomHeaderProps>`
	${FlexStyle}
	justify-content: ${(props) => (props.$isMobile ? 'center' : null)};
	font-size: ${(props) => (props.$isMobile ? '16px' : '20px')};
`;
