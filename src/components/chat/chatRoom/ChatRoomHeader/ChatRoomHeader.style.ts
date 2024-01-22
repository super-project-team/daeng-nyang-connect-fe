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
		cursor: pointer;
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

export const MoreUl = styled.ul`
	position: absolute;
	right: 20px;
	top: 0;
	width: 150px;
	padding: 10px 20px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 0 3px 0 rgba(120, 120, 120, 0.3);
	li {
		height: 20px;
		&:first-of-type {
			margin-bottom: 10px;
		}
	}
`;
