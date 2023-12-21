import { styled } from 'styled-components';

interface ResponsiveProps {
	$isMobile: boolean;
	$isTablet: boolean;
	$isPc: boolean;
	$isMaxWidth: boolean;
}

export const FindFamily = styled.div<ResponsiveProps>`
	width: ${(props) => (props.$isMaxWidth ? '100%' : '1320px')};
	padding: ${(props) =>
		props.$isMobile ? '0 10px' : props.$isMaxWidth ? '0 30px' : '0'};
	margin: ${(props) =>
		props.$isMobile ? '50px auto 100px auto' : '120px auto 150px auto'};

	& > div {
		display: flex;
		gap: 50px;
	}

	.register-fixed-btn {
	}

	.register-fixed-btn-box {
		display: ${(props) => (props.$isPc ? 'none' : 'flex')};
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: ${(props) => (props.$isMobile ? '20px' : '50px')};
		right: ${(props) => (props.$isMobile ? '10px' : '50px')};
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--color-light-salmon);
		overflow: hidden;
		cursor: pointer;
	}

	.register-btn {
		display: ${(props) => (props.$isPc ? 'block' : 'none')};
	}

	.filter-btn {
		display: ${(props) => (props.$isPc ? 'none' : 'block')};
	}
`;

export const CategoryTitle = styled.div<ResponsiveProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding-bottom: 20px;
	margin: ${(props) => (props.$isMobile ? '70px 0 30px 0' : '70px 0 50px 0')};
	border-bottom: 1px solid var(--color-light-salmon);

	& h1 {
		font-size: ${(props) =>
			props.$isPc ? '28px' : props.$isTablet ? '24px' : '16px'};
		font-weight: 400;
		line-height: 34px;
	}
	& button {
		width: ${(props) => (props.$isMobile ? '80px' : '150px')};
		padding: 4px;
		border: 1px solid var(--color-light-salmon);
		border-radius: 5px;
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	}
	& button:hover {
		background: var(--color-light-salmon);
		color: var(--color-peach);
	}
`;

export const FilterItems = styled.div<ResponsiveProps>`
	flex: 1;
	position: ${(props) => (props.$isPc ? 'unset' : 'fixed')};
	top: 0;
	left: 0;
	width: ${(props) => (props.$isPc ? 'inherit' : '100%')};
	height: ${(props) => (props.$isPc ? 'fit-content' : '100vh')};
	padding: 20px;
	border: ${(props) =>
		props.$isPc ? '1px solid var(--color-light-salmon)' : 'none'};
	border-radius: ${(props) => (props.$isPc ? '10px' : 'none')};
	background: #fff;
	z-index: ${(props) => (props.$isPc ? 'unset' : '100000')};

	& > div:first-child {
		padding-bottom: 10px;
		margin-bottom: 40px;
		border-bottom: 1px solid var(--color-light-salmon);
		font-size: 20px;
	}
	& > div:last-child {
		display: flex;
		flex-direction: column;
		gap: 40px;

		& > div:last-child input {
			width: 100%;
			height: 35px;
			padding: 10px;
			border: 1px solid var(--color-light-salmon);
			border-radius: 5px;
			outline: none;
		}
	}
	& p {
		margin-bottom: 15px;
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	}

	& label {
		margin: 0 20px 0 5px;
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	}

	& select {
		width: 100%;
		padding: 4px;
		border: 1px solid var(--color-light-salmon);
		color: gray;
		font-size: 12px;
		outline: var(--color-light-salmon);
	}

	& button {
		width: 40%;
		padding: 4px;
		margin: 0 auto;
		border-radius: 5px;
		background: var(--color-light-salmon);
		color: var(--color-peach);
		font-size: ${(props) => (props.$isMobile ? '12px' : '14px')};
		cursor: pointer;
	}

	.filter-close-btn {
		display: ${(props) => (props.$isPc ? 'none' : 'block')};
		position: absolute;
		top: 15px;
		right: 15px;
		cursor: pointer;
	}
`;

export const ItemList = styled.div<ResponsiveProps>`
	display: flex;
	flex: 3;
	gap: ${(props) => (props.$isMobile ? '8px' : '25px')};
	flex-wrap: wrap;
	/* justify-content: space-between; */
`;

export const ItemBox = styled.div<ResponsiveProps>`
	width: ${(props) =>
		props.$isMobile ? 'calc((100% - 16px) / 2)' : 'calc((100% - 50px) / 3)'};
	margin-bottom: ${(props) => (props.$isMobile ? '15px' : '50px')};
	border: 1px solid var(--color-peach);
	border-radius: 10px;
	overflow: hidden;
	cursor: pointer;

	& > div:first-child {
		display: flex;
		justify-content: center;
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		overflow: hidden;
	}

	& > div:last-child {
		position: relative;
		height: ${(props) => (props.$isMobile ? 'fit-content' : '150px')};
		padding: 20px;
	}

	& img {
		width: 100%;
		transition: all 0.5s;
	}

	& img:hover {
		scale: 1.1;
	}

	& svg {
		position: absolute;
		top: ${(props) => (props.$isMobile ? '10px' : '20px')};
		right: ${(props) => (props.$isMobile ? '10px' : '20px')};
		cursor: pointer;
	}

	& button {
		display: ${(props) => (props.$isMobile ? 'none' : 'block')};
		position: absolute;
		bottom: 20px;
		right: 20px;
		padding: 5px 20px;
		border: 1px solid var(--color-light-salmon);
		border-radius: 5px;
		cursor: pointer;
	}
	& button:hover {
		background: var(--color-light-salmon);
		color: var(--color-peach);
	}

	& p {
		margin-bottom: ${(props) => (props.$isMobile ? '10px' : '15px')};
		font-size: ${(props) => (props.$isMobile ? '12px' : 'inherit')};
	}
`;

//NewFamilyDetail

export const NewFamilyDetailContainer = styled.div<ResponsiveProps>`
	display: flex;
	flex-direction: ${(props) => (props.$isPc ? 'row' : 'column')};
	gap: ${(props) => (props.$isMobile ? '15px' : '50px')};
	width: ${(props) => (props.$isMaxWidth ? '100%' : '1320px')};
	padding: ${(props) =>
		props.$isMobile ? '0 10px' : props.$isMaxWidth ? '0 30px' : '0'};
	margin: ${(props) =>
		props.$isMobile ? '70px auto 150px auto' : '120px auto 150px auto'};
	font-size: ${(props) => (props.$isMobile ? '12px' : '20px')};

	& > div:last-child {
		width: ${(props) => (props.$isPc ? 'calc(100% - 550px)' : '100%')};
		position: relative;
	}

	& button {
		width: 100%;
		padding: 4px;
		margin-top: 20px;
		border: 1px solid var(--color-light-salmon);
		border-radius: 5px;
		background: var(--color-light-salmon);
		color: var(--color-peach);
		font-size: ${(props) => (props.$isMobile ? '12px' : '20px')};
		cursor: pointer;
	}
	& button:hover {
		background: #fff;
		color: var(--color-deep-blue);
	}

	.user-box-mobile {
		display: ${(props) => (props.$isPc ? 'none' : 'display')};
	}

	.user-box-pc {
		display: ${(props) => (props.$isPc ? 'display' : 'none')};
	}
`;

export const DetailImageBox = styled.div<ResponsiveProps>`
	display: flex;
	justify-content: center;
	position: relative;
	width: ${(props) => (props.$isPc ? '500px' : '100%')};
	height: ${(props) => (props.$isPc ? '500px' : 'auto')};
	aspect-ratio: ${(props) => (props.$isPc ? 'unset' : '1/1')};
	border-radius: 10px;
	overflow: hidden;
	& img {
		height: 100%;
	}
	& svg {
		position: absolute;
		top: 20px;
		right: 20px;
		cursor: pointer;
	}
`;

export const UserThumbnail = styled.div<ResponsiveProps>`
	display: flex;
	align-items: center;
	gap: 10px;
	position: relative;
	padding-bottom: 10px;
	border-bottom: 1px solid var(--color-light-salmon);

	& div:first-child {
		width: ${(props) => (props.$isMobile ? '30px' : '45px')};
		height: ${(props) => (props.$isMobile ? '30px' : '45px')};
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
	}

	& h5 {
		font-weight: 400;
		font-size: ${(props) => (props.$isMobile ? '16px' : 'inherit')};
	}

	& img {
		height: 100%;
	}

	& svg {
		position: absolute;
		right: 0;
		cursor: pointer;
	}
`;

export const MoreDropdown = styled.ul<ResponsiveProps>`
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 0px;
	top: ${(props) => (props.$isMobile ? '30px' : '40px')};
	width: ${(props) => (props.$isMobile ? '96px' : '120px')};
	height: ${(props) => (props.$isMobile ? '64px' : '85px')};
	border: 1px solid var(--color-light-salmon);
	background: #fff;
	font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
	z-index: 10;

	& li {
		display: flex;
		align-items: center;
		flex: 1;
		padding-left: 15px;
		cursor: pointer;
	}

	& li:first-child {
		border-bottom: 1px solid var(--color-light-salmon);
	}
`;

export const DetailTextBox = styled.div<ResponsiveProps>`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 15px;
	flex: 1;
	margin: 30px 0;

	& p {
		overflow-wrap: break-word;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: normal;
	}
`;

//NewFamilyDetailSwiper
export const DetailSwiper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 520px;
	margin-top: 150px;
	background: var(--color-peach);

	.swiper {
		width: 100%;
	}

	.swiper-wrapper {
		width: inherit;
	}

	.swiper-slide {
		aspect-ratio: 1 / 1.05;
		border-radius: 10px;
		background: #fff;
		overflow: hidden;
	}

	.swiper-slide div:first-child {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 2.5;
		overflow: hidden;

		& svg {
			position: absolute;
			top: 20px;
			right: 20px;
		}
	}

	.swiper-slide div:last-child {
		padding: 20px;

		& p {
			margin-bottom: 15px;
		}
	}

	.swiper-slide img {
		width: 100%;
	}
`;

//PetRegistration

export const PetRegistrationForm = styled.form<ResponsiveProps>`
	position: ${(props) => (props.$isPc ? 'unset' : 'absolute')};
	top: 0;
	left: 0;
	width: ${(props) => (props.$isMaxWidth ? '100%' : '1320px')};
	padding: ${(props) =>
		props.$isMobile ? '0 10px' : props.$isMaxWidth ? '0 30px' : '0'};
	margin: ${(props) => (props.$isPc ? '120px auto 150px auto' : '0 auto')};
	background: #fff;
	z-index: 1000;

	& > div:last-child {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& h5 {
		width: ${(props) => (props.$isMobile ? '60px' : '80px')};
		margin-right: ${(props) => (props.$isMobile ? '15px' : '30px')};
		font-weight: 400;
		font-size: ${(props) => (props.$isMobile ? '12px' : 'inherit')};
	}

	& button {
		width: ${(props) => (props.$isMobile ? '80%' : '420px')};
		padding: 4px;
		margin-top: ${(props) => (props.$isPc ? '100px' : '30px')};
		margin-bottom: ${(props) => (props.$isPc ? '0' : '30px')};
		border: 1px solid var(--color-light-salmon);
		border-radius: 5px;
		background: var(--color-light-salmon);
		color: #fff;
		font-size: ${(props) => (props.$isMobile ? '12px' : '16px')};
		cursor: pointer;
	}

	.register-title {
		margin: ${(props) => (props.$isPc ? '70px 0 50px 0' : '50px 0 30px 0')};
	}

	.register-close-btn {
		display: ${(props) => (props.$isPc ? 'none' : 'display')};
		cursor: pointer;
	}
`;

export const FormText = styled.div<ResponsiveProps>`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	position: relative;
	font-size: ${(props) => (props.$isMobile ? '12px' : 'inherit')};

	.text-box {
		align-items: ${(props) => (props.$isMobile ? 'flex-start' : 'center')};
	}

	& textarea {
		width: 85%;
		height: ${(props) => (props.$isMobile ? '60px' : '90px')};
		resize: none;
		padding: 10px;
		border: 1px solid var(--color-light-salmon);
		outline: none;
		overflow: hidden;
	}

	& > div {
		display: flex;
		align-items: center;
		width: ${(props) => (props.$isPc ? 'calc((100% - 100px) / 2)' : '100%')};
		margin-bottom: 30px;
	}

	& input[type='text'] {
		width: 85%;
		height: 30px;
		padding-left: 10px;
		border: 1px solid var(--color-light-salmon);
		outline: none;
	}

	& input[type='radio'] {
		margin: 0;
		margin-right: 10px;
	}

	& input[name='breed'] {
		width: 30%;
		margin-right: 30px;
	}

	& input[name='age'] {
		width: 30%;
	}

	& input[type='file']::file-selector-button {
		width: 100px;
		padding: 4px;
		border: 1px solid var(--color-light-salmon);
		border-radius: 5px;
		background: #fff;
		font-size: 12px;
		text-align: center;
		cursor: pointer;
	}

	& label {
		margin-right: 30px;
	}

	& select {
		width: 85%;
		height: 30px;
		padding: 4px;
		border: 1px solid var(--color-light-salmon);
		color: gray;
		font-size: 12px;
		outline: var(--color-light-salmon);
	}

	& button {
		position: absolute;
		left: 50%;
		bottom: ${(props) => (props.$isMobile ? '-70px' : '-100px')};
		transform: translateX(-50%);
	}
`;
