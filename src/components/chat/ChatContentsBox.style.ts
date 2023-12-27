import styled, { css } from 'styled-components';

type ChatProps = {
	size?: string;
	$isMobile?: boolean;
};
export const FlexStyle = css`
	display: flex;
	align-items: center;
	width: 100%;
`;
export const ChatInnerLeftDiv = styled.div<ChatProps>`
	width: ${(props) => (props.$isMobile ? '100%' : 'calc(35% - 20px)')};
	margin: ${(props) => (props.$isMobile ? '0' : '0 20px 0 0')};
`;
export const ChatInnerRightDiv = styled.div`
	width: 65%;
`;
export const UserImgDiv = styled.div<ChatProps>`
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	border-radius: 50%;
	margin-right: 8px;
	overflow: hidden;
	img {
		height: 100%;
	}
`;
