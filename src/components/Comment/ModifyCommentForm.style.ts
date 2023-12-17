import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const Form = styled.form`
	position: absolute;
	top: -50px;
	left: 50%;
	width: 100%;
	height: 150px;
	padding: 10px;
	margin-top: 60px;
	background-color: white;
	transform: translateX(-50%);
	border: 1px solid var(--color-light-salmon);
	border-radius: 10px;
	z-index: 10;
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

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;
