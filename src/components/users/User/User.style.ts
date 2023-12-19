import styled from 'styled-components';

interface ResponsiveProps {
	$isMobile: boolean;
	$isTablet: boolean;
	$isPc: boolean;
	$isMaxWidth: boolean;
}

export const UserWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	flex-direction: column;
	overflow-x: hidden;
`;

export const UserBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1380px;
	height: 100vh;
	flex-direction: column;
`;

export const UserContent = styled.div`
	padding-top: 30px;
	width: 90%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const UserNamePhotoDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 30px;
	flex-direction: column;
`;

export const UserPhotoDiv = styled.div<ResponsiveProps>`
	width: ${(props) => (props.$isMobile ? '80px' : '100px')};
	height: ${(props) => (props.$isMobile ? '80px' : '100px')};
`;

export const UserNameDiv = styled.div`
	font-size: 20px;
	font-weight: 500;
	color: var(--color--deep--blue);
	height: 33px;
	width: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const UserItemDiv = styled.div`
	flex-direction: column;
`;

export const UserLeftItemDiv = styled.div<ResponsiveProps>`
	/* ${(props) => (props.$isMobile ? '200px' : '427px')}; */
	width: ${(props) => (props.$isMobile ? '272px' : '472px')};
	height: ${(props) => (props.$isMobile ? '36px' : '48px')};
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	justify-content: space-between;
	display: flex;
	align-items: center;
	margin-top: 16px;
	margin-left: ${(props) => (props.$isMobile ? '0px' : '16px')};
	padding-left: 20px;
	padding-right: 8px;
	box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
`;

export const UserLeftItemDivEmail = styled.div<ResponsiveProps>`
	/* ${(props) => (props.$isMobile ? '200px' : '427px')}; */
	width: ${(props) => (props.$isMobile ? '352px' : '542px')};
	height: ${(props) => (props.$isMobile ? '36px' : '48px')};
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	justify-content: space-between;
	display: flex;
	align-items: center;
	margin-top: 16px;
	margin-left: ${(props) => (props.$isMobile ? '0px' : '16px')};
	padding-left: 20px;
	padding-right: 8px;
	box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
`;

export const UserLeftItemDivWrapper = styled.div<ResponsiveProps>`
	width: 652px;
	height: ${(props) => (props.$isMobile ? '48px' : '64px')};
	justify-content: ${(props) => (props.$isMobile ? 'center' : 'space-between')};
	display: flex;
	align-items: center;
`;

export const UserRightItemDiv = styled.div`
	width: 427px;
	height: 48px;
	border-bottom: 1px solid #434343;
	font-size: 20px;
	justify-content: space-between;
	display: flex;
	align-items: center;
	margin-top: 16px;
	padding-right: 8px;
`;

export const UserItemTitleDiv = styled.div<ResponsiveProps>`
	width: 100px;
	height: 48px;
	font-size: 16px;
	justify-content: center;
	display: ${(props) => (props.$isMobile ? 'none' : 'flex')};
	align-items: center;
	margin-top: 16px;

	box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
`;

export const UserItemContentDiv = styled.div`
	width: 500px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: left;
`;

export const ProductRegisterButton = styled.button`
	width: 427px;
	height: 64px;
	background-color: #5d2510;
	font-size: 20px;
	color: #ede1d2;
	border: 0;
	&:hover {
		cursor: pointer;
	}
`;

export const SignOutDiv = styled.div<ResponsiveProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	font-size: ${(props) => (props.$isMobile ? '14px' : '16px')};
	&:hover {
		cursor: pointer;
	}
`;
export const DeleteYourAccountDiv = styled.div`
	font-size: 16px;
	&:hover {
		cursor: pointer;
	}
`;
export const ProfileImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
export const ProfileImgDiv = styled.div`
	width: 100px;
	height: 100px;
	border-radius: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--color-light-salmon);
	overflow: hidden;
`;

export const ProfileImgLabel = styled.label`
	width: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 5px 0 20px 0;
	font-size: 16px;
	color: var(--color-main-text);
	display: inline-block;
	cursor: pointer;
`;

export const ProfileImgInput = styled.input`
	display: none;
`;

export const ModalDiv = styled.div<ResponsiveProps>`
	width: 60px;
	height: ${(props) => (props.$isMobile ? '36px' : '48px')};
	font-size: ${(props) => (props.$isMobile ? '14px' : '16px')};
	justify-content: center;
	display: flex;
	align-items: center;
	margin-top: 16px;
	margin-left: 16px;
	box-shadow: 1px 2px 6px 1px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	background-color: rgba(227, 155, 166, 0.4);
	&:hover {
		cursor: pointer;
		background-color: rgba(227, 155, 166, 0.5);
	}
`;
export const GenderDiv = styled.div`
	width: 60px;
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
