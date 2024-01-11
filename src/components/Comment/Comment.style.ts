import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const CommentWrap = styled.div`
	position: relative;
`;

export const CommentLi = styled.li`
	position: relative;
	display: flex;
	justify-content: space-between;
	padding: 16px 8px;
	border-bottom: 1px solid #ebeced;
`;

export const InfoWrap = styled.div`
	position: relative;
	display: flex;
`;

export const UserImageWrap = styled.div<NavOptionProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${(props) =>
		props.$isTablet ? '28px' : props.$isMobile ? '24px' : '30px'};
	height: ${(props) =>
		props.$isTablet ? '28px' : props.$isMobile ? '24px' : '30px'};
	margin-right: 16px;
	border-radius: 50%;
	border: 1px solid black;
	cursor: pointer;

	& img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
`;

export const TextWrap = styled.div<NavOptionProps>`
	& div {
		margin-bottom: 8px;
	}

	& div:nth-child(1) {
		font-weight: bold;
		font-size: ${(props) =>
			props.$isTablet ? '16px' : props.$isMobile ? '14px' : '16px'};
	}

	& div:nth-child(2) {
		margin-bottom: 12px;
		font-size: ${(props) =>
			props.$isTablet ? '15px' : props.$isMobile ? '12px' : '16px'};
	}

	& div:nth-child(3) {
		color: gray;
		font-size: ${(props) =>
			props.$isTablet ? '11px' : props.$isMobile ? '10px' : '12px'};
	}
`;

export const KebabWrap = styled.div`
	position: relative;
	cursor: pointer;
`;

export const UserPageButtonWrap = styled.div`
	position: absolute;
	left: 30px;
	top: 10px;
	padding: 4px 8px;
	background-color: white;
	border: 1px solid var(--color-light-salmon);
	cursor: pointer;
	z-index: 1;
`;

export const MenuButtonWrap = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	right: 2px;
	top: 30px;
	width: 80px;
	cursor: pointer;
	z-index: 1000;
`;

export const ButtonWrap = styled.div`
	padding: 4px 8px;
	background-color: white;
	border: 1px solid var(--color-light-salmon);
`;

export const DeletePopUpWrap = styled.div<NavOptionProps>`
	position: fixed;
	top: 30px;
	left: ${(props) => (props.$isMobile ? '50%' : '50%')};
	width: ${(props) => (props.$isMobile ? '90%' : '55%')};
	height: 120px;
	padding: 8px;
	transform: translateX(-50%);
	background-color: black;
	border-radius: 8px;
	z-index: 10000;

	& div {
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
		color: white;
	}

	& button {
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
		color: var(--color-light-blue);
		border: 0.5px solid var(--color-light-blue);
		margin-right: 6px;
	}

	& button:hover {
		background-color: var(--color-light-blue);
		color: var(--color-deep-blue);
	}
`;

export const PopUpInfoWrap = styled.div`
	height: 60%;

	& div {
		padding: 8px;
	}
`;

export const PopUpButtonWrap = styled.div`
	margin-top: 10px;

	& div {
		display: flex;
		justify-content: flex-end;
		width: 100%;
	}
`;
