import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const Form = styled.form`
	width: 100%;
	height: 150px;
	padding: 10px;
	margin-top: 60px;
	border: 1px solid var(--color-light-salmon);
	border-radius: 10px;

	& textarea {
		letter-spacing: 0.1px;
	}
`;

export const NickNameText = styled.div<NavOptionProps>`
	font-size: ${(props) => (props.$isMobile ? '14px' : '16px')};
	font-weight: 400;
`;

export const TextArea = styled.textarea`
	width: 100%;
	height: 60%;
	margin-top: 8px;
	border: none;
	outline: none;
	letter-spacing: 0.1px;
`;

export const ButtonWrap = styled.div<NavOptionProps>`
	text-align: right;

	& button {
		margin-right: 8px;
		border: none;
		outline: none;
		background-color: transparent;
		cursor: pointer;
		font-size: ${(props) => (props.$isMobile ? '14px' : '16px')};
	}
`;
