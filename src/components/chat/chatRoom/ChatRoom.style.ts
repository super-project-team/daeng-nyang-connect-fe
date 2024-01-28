import styled from 'styled-components';

type ChatRoomProps = {
	$isMobile?: boolean;
};

export const ChatRoomDiv = styled.div<ChatRoomProps>`
	position: relative;
	width: 100%;
	height: ${(props) => (props.$isMobile ? '100vh' : 'calc(100% - 60px)')};
	border: ${(props) =>
		props.$isMobile ? null : '1px solid var(--color-light-salmon)'};
	border-radius: 20px;
	margin-top: ${(props) => (props.$isMobile ? '45px' : null)};
`;
export const ChatBubbleUl = styled.ul`
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	height: 560px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 6px;
	}
	&::-webkit-scrollbar-thumb {
		height: 20%; /* 스크롤바의 길이 */
		background: var(--color-peach); /* 스크롤바의 색상 */

		border-radius: 10px;
	}
	&::-webkit-scrollbar-track {
		background: #fff; /*스크롤바 뒷 배경 색상*/
	}

	.sender {
		align-self: end;
	}
	.receiver {
		align-self: start;
	}
`;

export const ChatBubbleLi = styled.li`
	width: max-content;
	padding: 8px 12px;
	margin-bottom: 10px;
	border-radius: 15px;

	list-style: none;
	&.sender {
		background-color: var(--color-light-salmon);
		color: #fff;
		margin-right: 20px;
	}
	&.receiver {
		background-color: #ddd;
		margin-left: 20px;
	}
`;
