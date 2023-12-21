import { styled } from 'styled-components';

interface ResponsiveProps {
	$isMobile?: boolean;
	$isTablet?: boolean;
	$isPc?: boolean;
	$isMaxWidth?: boolean;
}

//Reviews

export const ReviewsContainer = styled.div<ResponsiveProps>`
	width: ${(props) => (props.$isMaxWidth ? '100%' : '1320px')};
	padding: ${(props) =>
		props.$isMobile ? '0 10px' : props.$isMaxWidth ? '0 30px' : '0'};
	margin: ${(props) =>
		props.$isMobile ? '0 auto 50px auto' : '120px  auto 150px auto'};
`;

export const ReviewsList = styled.div<ResponsiveProps>`
	display: grid;
	grid-template-columns: ${(props) =>
		props.$isPc ? '1fr 1fr 1fr' : '1fr 1fr'};
	gap: ${(props) => (props.$isPc ? '25px' : '10px')};
	width: 100%;
`;

export const ReviewBox = styled.div<ResponsiveProps>`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	aspect-ratio: ${(props) => (props.$isMobile ? 'unset' : '3 / 4.2')};
	margin-bottom: ${(props) => (props.$isMobile ? '20px' : '50px')};
	border: 1px solid var(--color-peach);
	border-radius: 10px;
	overflow: hidden;
	cursor: pointer;

	& > div:first-child {
		display: flex;
		justify-content: center;
		position: relative;
		width: 100%;
		aspect-ratio: 3.5 / 3;
		overflow: hidden;
	}

	& > div:last-child {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		padding: ${(props) => (props.$isMobile ? '10px' : '20px')};
	}

	& img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		transition: all 0.5s;
	}

	& img:hover {
		scale: 1.1;
	}
	& button {
		display: ${(props) => (props.$isMobile ? 'none' : 'block')};
		padding: 4px 25px;
		border: 1px solid var(--color-light-salmon);
		border-radius: 5px;
		cursor: pointer;
	}
	& button:hover {
		background: var(--color-light-salmon);
		color: var(--color-peach);
	}

	& p {
		display: -webkit-box;
		margin-bottom: ${(props) => (props.$isMobile ? '5px' : '15px')};
		font-size: ${(props) => (props.$isMobile ? '12px' : 'inherit')};
		overflow-wrap: break-word;
		-webkit-line-clamp: ${(props) => (props.$isMobile ? '2' : '4')};
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: normal;
	}

	& svg {
		position: ${(props) => (props.$isMobile ? 'absolute' : 'unset')};
		top: 10px;
		right: 10px;
		cursor: pointer;
	}
`;

export const ButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

//Review(Detail)

export const ReviewTextBox = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
`;

export const CommentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const CommentList = styled.div<ResponsiveProps>`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: ${(props) => (props.$isMobile ? '15px 0' : '20px 0 12px')};
	border: 1px solid var(--color-peach);
	border-left: none;
	border-right: none;
	font-size: 20px;
`;

export const CommentBox = styled.div<ResponsiveProps>`
	position: relative;
	display: flex;
	align-items: center;
	font-size: ${(props) => (props.$isMobile ? '12px' : 'inherit')};
	margin-bottom: 8px;

	& div:first-child {
		width: ${(props) => (props.$isMobile ? '30px' : '45px')};
		height: ${(props) => (props.$isMobile ? '30px' : '45px')};
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
	}

	& img {
		height: 100%;
	}

	& h5 {
		margin: ${(props) => (props.$isMobile ? '0 5px' : '0 15px')};
		font-weight: 400;
	}

	p {
		flex: 1;
	}

	& span {
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	}
	time {
		font-size: 14px;
	}
	svg {
		color: var(--color-light-salmon);
	}
`;

export const ModifyInputDiv = styled.div`
	position: relative;
	flex: 1;
	input {
		width: 90%;
		height: 100%;
		font-size: 16px;
		border: 2px solid var(--color-ligth-salmon);
		&:focus {
			border: none;
		}
	}
`;
export const ModifyBtnsBox = styled.div`
	position: absolute;
	top: -12px;
	right: 12%;
	gap: 4px;
	button {
		width: 40px;
		font-size: 14px;
	}
`;

export const CommentMoreUl = styled.ul`
	position: absolute;
	z-index: 1;
	top: 15px;
	right: 10px;
	background-color: #fff;
	border-radius: 3px;
	text-align: center;
	font-size: 16px;
	box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
	li {
		padding: 10px 20px;
		&:last-child {
			background-color: #fff;
		}
	}
`;

export const LikeContainer = styled.div<ResponsiveProps>`
	display: flex;
	align-items: center;
	margin-top: 20px;
	& p {
		margin-left: 10px;
		font-size: ${(props) => (props.$isMobile ? '12px' : 'inherit')};
	}
`;

export const CommentInputContainer = styled.form<ResponsiveProps>`
	display: flex;
	justify-content: space-between;
	padding: 20px 0;

	& input {
		flex: 1;
		padding: 4px 0;
		border: none;
		outline-color: var(--color-light-salmon);
	}

	& input::placeholder {
		color: var(--color-light-blue);
		font-weight: 400;
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	}

	& button {
		position: unset;
		width: fit-content;
		margin-top: 0;
		margin-left: 20px;
		border: none;
		background: none;
		color: var(--color-light-salmon);
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	}
`;
export const ModifyDiv = styled.div<ResponsiveProps>`
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 100%;
	height: 100%;
	background-color: #fff;
	textarea {
		position: absolute;
		bottom: 0px;
		width: ${(props) =>
			props.$isMobile ? '70%' : props.$isTablet ? '76%' : '63%'};
		min-height: 300px;
		padding: 0;
		border-color: var(--color-light-salmon);
		font-size: 16px;
	}
`;
export const ModifyBtnsDiv = styled.div<ResponsiveProps>`
	position: absolute;
	bottom: 0;
	right: 0;
	display: flex;
	gap: ${(props) => (props.$isMobile ? '4px' : '10px')};
	width: ${(props) => (props.$isMobile ? '80px' : '150px')};
	button {
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
		margin-top: ${(props) => (props.$isMobile ? '4px' : '20px')};
	}
`;
