import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const ModalForm = styled.form<NavOptionProps>`
	height: 100%;
	padding: 12px;

	& input {
		border: 1px solid var(--color-light-salmon);
		outline: none;
		border-radius: 4px;
	}

	& textarea {
		width: 70%;
		height: 150px;
		padding: 4px 2px;
		border: 1px solid var(--color-light-salmon);
		border-radius: 4px;
		outline: none;
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
		letter-spacing: 0.1px;
	}
`;

export const InfoWrap = styled.div`
	height: 85%;
`;

export const TitleAndButtonWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 12px;
	margin: 12px 0px;
	border-bottom: 0.5px solid var(--color-light-salmon);
`;

export const Title = styled.h1`
	font-size: 20px;
	font-weight: bold;
`;

export const LabelWrap = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;

	@media (max-height: 724px) {
		margin-bottom: 8px;
	}
`;

export const LabelTitle = styled.label<NavOptionProps>`
	width: ${(props) => (props.$isMobile ? '25%' : '20%')};
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	font-weight: 400;
`;

export const InputWrap = styled.div<NavOptionProps>`
	display: flex;
	align-items: center;
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};

	& div {
		margin-left: 8px;
	}
`;

export const CheckInput = styled.input`
	border: 1px solid var(--color-light-salmon);
`;

export const ButtonWrap = styled.div`
	display: flex;
	justify-content: center;
	width: 65%;
	padding: 4px 0px;
	margin: auto;
	border-radius: 4px;
	background-color: var(--color-light-salmon);

	&:hover {
		background-color: var(--color-peach);
		cursor: pointer;

		& button {
			color: var(--color-deep-blue);
			cursor: pointer;
		}
	}

	& button {
		color: var(--color-peach);
		cursor: pointer;
	}
`;

export const TextInput = styled.input<NavOptionProps>`
	width: 70%;
	padding: 4px;
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
`;

export const StyledIoClose = styled(IoClose)`
	width: 20px;
	height: 20px;
`;

export const ImageAndParagraphWrap = styled.div<NavOptionProps>`
	margin-top: ${(props) => (props.$isMobile ? '8px' : '')};
`;
