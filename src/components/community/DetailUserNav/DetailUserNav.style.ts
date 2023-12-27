import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

interface NavOptionProps {
	$isMaxWidth?: boolean;
	$isActive?: boolean;
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const DetailUserWrap = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 12px;
	border-bottom: 1px solid var(--color-light-salmon);
`;

export const InfoWrap = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;

export const UserImageWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 36px;
	height: 36px;
	margin-right: 16px;
	border: 1px solid black;
	border-radius: 50%;
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
`;

export const NicknameText = styled.div<NavOptionProps>`
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
`;

export const CreatedAtText = styled.div<NavOptionProps>`
	margin-top: 8px;
	color: gray;
	font-size: ${(props) => (props.$isMobile ? '10px' : '12px')};
`;

export const KebabWrap = styled.div`
	position: relative;
	margin-left: 20px;
	cursor: pointer;
`;

export const SubInfoWrap = styled.div`
	display: flex;
	align-items: center;

	& div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const LikeWrap = styled.div<NavOptionProps>`
	padding: ${(props) => (props.$isMobile ? '0px 4px' : '0px 10px')};
	border-radius: 10px;
	background-color: var(--color-light-salmon);
	cursor: pointer;
`;

export const LikeCount = styled.div<NavOptionProps>`
	min-width: ${(props) => (props.$isMobile ? '30px' : '45px')};
	min-height: ${(props) => (props.$isMobile ? '30px' : '45px')};
	padding: 4px 8px;
	margin-left: 8px;
	border-radius: 50%;
	color: white;
`;

export const StyledFaHeart = styled(FaHeart)`
	margin-left: 8px;
	color: white;
`;

export const UserPageButtonWrap = styled.div`
	position: absolute;
	left: 30px;
	top: 40px;
	padding: 4px 8px;
	background-color: white;
	border: 1px solid var(--color-light-salmon);
	cursor: pointer;
	z-index: 3;
`;

export const MenuButtonWrap = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	right: 2px;
	top: 30px;
	width: 100px;
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
