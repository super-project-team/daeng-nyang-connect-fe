import styled from 'styled-components';

interface ResponsiveProps {
	$isMobile?: boolean;
	$isTablet?: boolean;
	$isPc?: boolean;
	$isMaxWidth?: boolean;
}

export const RegisterWrapper = styled.div<ResponsiveProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	flex-direction: column;
	overflow-x: hidden;
	margin-top: 60px;
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
`;

export const RegisterDiv = styled.div<ResponsiveProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding-top: ${(props) => (props.$isMobile ? '150px' : '')};
	padding-bottom: ${(props) => (props.$isMobile ? '150px' : '')};
`;

export const Logo = styled.img<ResponsiveProps>`
	width: ${(props) => (props.$isMobile ? '150px' : '150px')};
	height: ${(props) => (props.$isMobile ? '150px' : '150px')};
`;

export const RegisterInput = styled.input<ResponsiveProps>`
	width: ${(props) => (props.$isMobile ? '50%' : '100%')};
	height: 35px;
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

export const RegisterSelectBox = styled.select<ResponsiveProps>`
	width: ${(props) => (props.$isMobile ? '300px' : '220px')};
	height: 35px;
	margin-bottom: 16px;
	border: none;
	padding-left: 16px;
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	&:required:invalid {
		color: #808080;
	}
	&:hover {
		box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.5);
	}
	&:focus {
		box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.5);
		outline: none;
	}
	option[value=''][disabled] {
		display: none;
	}
	option {
		color: #111;
	}
`;

export const RegisterSelectBoxLeft = styled.select<ResponsiveProps>`
	margin-left: ${(props) => (props.$isMobile ? '15px' : '0px')};
	width: ${(props) => (props.$isMobile ? '300px' : '220px')};
	height: 35px;
	margin-bottom: 16px;
	border: none;
	padding-left: 16px;
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	&:required:invalid {
		color: #808080;
	}
	&:hover {
		box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.5);
	}
	&:focus {
		box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.5);
		outline: none;
	}
	option[value=''][disabled] {
		display: none;
	}
	option {
		color: #111;
	}
`;

export const Option = styled.option``;

export const RegisterInputSmall = styled(RegisterInput)`
	width: 48%;
`;

export const RegisterDoubleDiv = styled.div<ResponsiveProps>`
	display: flex;
	align-items: center;
	justify-content: ${(props) =>
		props.$isMobile ? 'space-between' : 'space-between'};
	width: ${(props) => (props.$isMobile ? '50%' : '100%')};
`;

export const RegisterForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-bottom: 40px;
`;

export const RegisterButton = styled.button<ResponsiveProps>`
	background-color: rgba(227, 155, 166, 0.9);
	color: white;
	padding: 8px, 52px, 8px, 52px;
	width: ${(props) => (props.$isMobile ? '50%' : '100%')};
	height: 42px;
	font-size: ${(props) => (props.$isMobile ? '16px' : '20px')};
	font-weight: 400;
	border-radius: 10px;
	box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.25);

	&:hover {
		cursor: pointer;
		background-color: rgba(227, 155, 166, 1);
	}
`;

export const SnsIconDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 20px;
	width: 427px;
	height: 50px;
	border-top: 1px solid #434343;
`;

export const Paragraph = styled.p<ResponsiveProps>`
	margin-top: -10px;
	width: ${(props) => (props.$isMobile ? '50%' : '90%')};
	text-align: left;
	font-size: ${(props) => (props.$isMobile ? '9px' : '12px')};
	color: var(--color--deep-blue);
	font-weight: 500;
`;

export const ExParagraph = styled.p<ResponsiveProps>`
	font-weight: 500;
	margin-top: -10px;
	width: ${(props) => (props.$isMobile ? '50%' : '90%')};
	text-align: left;
	font-size: ${(props) => (props.$isMobile ? '9px' : '12px')};
`;
