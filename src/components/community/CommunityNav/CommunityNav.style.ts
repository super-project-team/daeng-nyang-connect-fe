import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
interface NavOptionProps {
	$isMaxWidth?: boolean;
	$isActive?: boolean;
	$isTablet?: boolean;
	$isMobile?: boolean;
	isLoading?: boolean;
}

export const TitleAndSearchWrap = styled.div<NavOptionProps>`
	display: flex;
	flex-direction: ${(props) => (props.$isMobile ? 'column' : 'row')};
	align-items: center;
	justify-content: space-between;
	max-width: 1320px;
	padding: ${(props) => (props.$isMobile ? '0 0 0 4px' : '0 0 20px 0')};
	margin: ${(props) =>
		props.$isMobile
			? '70px 0 0 0'
			: props.$isMaxWidth
			  ? '105px 30px 0'
			  : '105px 0 0 0'};
	margin-top: ${(props) =>
		props.isLoading ? '-30px' : props.$isMobile ? '70px' : '105px'};
	border-bottom: 1px solid var(--color-light-salmon);
`;

export const TitleWrap = styled.div<NavOptionProps>`
	margin-bottom: ${(props) => (props.$isMobile ? '10px' : '0px')};

	& span {
		margin-right: 10px;
		font-size: ${(props) => (props.$isMobile ? '12px' : '20px')};
	}

	& span:nth-child(3) {
		font-size: ${(props) => (props.$isMobile ? '16px' : '24px')};
		font-weight: 400;
	}
`;

export const SearchWrap = styled.form<NavOptionProps>`
	display: flex;
	justify-content: space-between;
	width: ${(props) =>
		props.$isTablet ? '450px' : props.$isMobile ? '340px' : '500px'};
	padding: 10px;
	margin-bottom: ${(props) => (props.$isMobile ? '16px' : '0')};
	border: 0.5px solid var(--color-light-salmon);
	border-radius: 20px;

	& input {
		width: 70%;
		border: transparent;
		outline: none;
		font-family: 'Noto Sans KR', sans-serif;
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	}
`;

export const StyledIoIosSearch = styled(IoIosSearch)`
	cursor: pointer;
	width: 24px;
	height: 24px;
	vertical-align: -3px;
`;

export const Article = styled.article<NavOptionProps>`
	display: flex;
	flex-direction: ${(props) => (props.$isMobile ? 'column' : 'row')};
	max-width: 1320px;
	margin: ${(props) =>
		props.$isMobile ? '0' : props.$isMaxWidth ? '0 30px' : null};
`;

export const Nav = styled.nav<NavOptionProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: ${(props) => (props.$isMobile ? '100%' : '15%')};
	min-height: ${(props) => (props.$isMobile ? '100%' : '100vh')};
	margin: ${(props) => (props.$isMobile ? '0' : '0')};
	padding: ${(props) =>
		props.$isTablet ? '10px' : props.$isMobile ? '0px' : '20px'};
	border-right: ${(props) =>
		props.$isMobile ? 'none' : '1px solid var(--color-light-salmon)'};
	border-bottom: ${(props) =>
		props.$isMobile ? '1px solid var(--color-light-salmon)' : 'none'};

	& div {
		margin: 4px 0;
		width: 100%;
		text-align: center;

		& button:hover {
			border-radius: 3px;
			background-color: var(--color-peach);
		}
	}
`;

export const NavOption = styled.button<NavOptionProps>`
	padding: 5px;
	margin-bottom: 5px;
	border: none;
	outline: none;
	background-color: transparent;
	font-size: ${(props) =>
		props.$isTablet ? '16px' : props.$isMobile ? '14px' : '18px'};
	cursor: pointer;
`;

export const ButtonWrap = styled.div<NavOptionProps>`
	display: flex;
	width: 100%;
	flex-direction: ${(props) => (props.$isMobile ? 'row' : 'column')};
	justify-content: ${(props) => (props.$isMobile ? '' : '')};
`;

export const Button = styled.button<NavOptionProps>`
	position: ${(props) => (props.$isMobile ? 'fixed' : '')};
	bottom: ${(props) => (props.$isMobile ? '20px' : 'none')};
	right: ${(props) => (props.$isMobile ? '10px' : 'none')};
	width: ${(props) => (props.$isMobile ? '50px' : '70%')};
	height: ${(props) => (props.$isMobile ? '50px' : '')};
	padding: ${(props) => (props.$isMobile ? '4px' : '4px')};
	border: 0.5px solid var(--color-light-salmon);
	border-radius: ${(props) => (props.$isMobile ? '50%' : '3px')};
	background-color: ${(props) =>
		props.$isMobile ? 'var(--color-light-salmon)' : 'transparent'};
	font-size: ${(props) =>
		props.$isTablet ? '16px' : props.$isMobile ? '16px' : '18px'};
	color: ${(props) => (props.$isMobile ? 'white' : '')};
	cursor: pointer;
	z-index: ${(props) => (props.$isMobile ? '10' : '0')};

	&:hover {
		${(props) =>
			props.$isMobile
				? 'background-color: var(--color-peach); color: var(--color-deep-blue);'
				: 'background-color: var(--color-light-salmon); color: white;'}
	}
`;

export const NavOptionWrap = styled.div<NavOptionProps>`
	display: flex;
	flex-direction: column;
`;

export const NavOptionButton = styled.button<NavOptionProps>`
	margin-bottom: 5px;
	border: none;
	outline: none;
	background-color: transparent;
	font-size: ${(props) =>
		props.$isTablet ? '14px' : props.$isMobile ? '12px' : '14px'};
	cursor: pointer;
`;

export const NavOptionText = styled.span<NavOptionProps>`
	border-bottom: ${(props) => (props.$isActive ? '0.5px solid black' : 'none')};
	font-weight: ${(props) => (props.$isActive ? '400' : null)};
`;

export const IoMenuWrap = styled.div`
	padding: 10px;
	margin-right: 8px;
`;

export const MenuAndSearchWrap = styled.div`
	display: flex;
`;

export const StyledFaPlus = styled(FaPlus)``;
