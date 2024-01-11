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
`;
export const Button = styled.button`
	font-size: 14px;
	padding: 10px 20px;
	border: none;
	background-color: #ababab;
	border-radius: 10px;
	color: white;
	font-weight: 200;
	cursor: pointer;
	&:hover {
		background-color: #898989;
	}
`;

export const ModalForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-bottom: 30px;
`;

export const ModalInput = styled.input<ResponsiveProps>`
	width: 80%;
	height: ${(props) => (props.$isMobile ? '32px' : '42px')};
	margin-bottom: 16px;
	border: none;
	padding-left: 16px;
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	&:hover {
		box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.5);
	}
	&:focus {
		box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.5);
		outline: none;
	}
`;

export const ChangeButton = styled.button<ResponsiveProps>`
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

export const CloseButton = styled.button<ResponsiveProps>`
	background-color: rgba(158, 132, 141, 0.8);
	color: white;
	padding: 8px, 52px, 8px, 52px;
	width: 80%;
	height: ${(props) => (props.$isMobile ? '32px' : '42px')};
	font-size: ${(props) => (props.$isMobile ? '14px' : '20px')};
	font-weight: 400;
	border-radius: ${(props) => (props.$isMobile ? '8px' : '10px')};
	box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.25);
	margin-top: 10px;

	&:hover {
		cursor: pointer;
		background-color: rgba(158, 132, 141, 1);
	}
`;

export const Paragraph = styled.p<ResponsiveProps>`
	margin-top: -5px;
	margin-bottom: 5px;
	width: 80%;
	text-align: left;
	font-size: ${(props) => (props.$isMobile ? '9px' : '12px')};
	color: var(--color--deep-blue);
	font-weight: 500;
`;
