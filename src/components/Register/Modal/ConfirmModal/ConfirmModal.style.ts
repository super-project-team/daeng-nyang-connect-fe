import styled from 'styled-components';

interface ResponsiveProps {
	$isMobile: boolean;
	$isTablet: boolean;
	$isPc: boolean;
	$isMaxWidth: boolean;
}

export const Overlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.2);
	z-index: 9999;
`;

export const ModalWrap = styled.div<ResponsiveProps>`
	width: ${(props) => (props.$isMobile ? '80%' : '50%')};
	height: fit-content;
	border-radius: 15px;
	background-color: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const TitleDiv = styled.div<ResponsiveProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${(props) => (props.$isMobile ? '16px' : '25px')};
	font-weight: 600;
	margin-bottom: ${(props) => (props.$isMobile ? '30px' : '60px')};
`;

export const Contents = styled.div`
	margin: 50px 30px;
	h1 {
		font-size: 30px;
		font-weight: 600;
		margin-bottom: 60px;
	}
	img {
		margin-top: 60px;
		width: 300px;
	}
`;

export const ModalForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-bottom: 30px;
`;

export const ModalInput = styled.input`
	width: 427px;
	height: 40px;
	margin-bottom: 16px;
	border: 1px solid #434343;
	padding-left: 16px;
	font-size: 16px;
`;

export const DeleteButton = styled.button`
	background-color: #5d2510;
	color: #ede1d2;
	border: 1px solid #5d2510;
	padding: 8px, 52px, 8px, 52px;
	width: 427px;
	height: 42px;
	font-size: 20px;
	font-weight: 400;
	margin-bottom: 20px;

	&:hover {
		cursor: pointer;
	}
`;

export const CloseButton = styled.button<ResponsiveProps>`
	background-color: rgba(227, 155, 166, 0.9);
	color: white;
	padding: 8px, 52px, 8px, 52px;
	width: 80%;
	height: ${(props) => (props.$isMobile ? '32px' : '42px')};
	font-size: ${(props) => (props.$isMobile ? '14px' : '20px')};
	font-weight: 400;
	border-radius: ${(props) => (props.$isMobile ? '8px' : '10px')};
	box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.25);

	&:hover {
		cursor: pointer;
		background-color: rgba(227, 155, 166, 1);
	}
`;
