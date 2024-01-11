import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const MyPetLi = styled.li<NavOptionProps>`
	width: 100%;
	height: ${(props) => (props.$isMobile ? '200px' : '300px')};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		border-radius: 8px;
		transition: transform 0.7s ease;
		cursor: pointer;
	}

	& img:hover {
		transform: scale(1.05);
	}

	.default-image {
		padding: 20px;
		background-color: rgba(255, 127, 80, 0.1);
	}
`;

export const ImageWrap = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	border-radius: 8px;
	overflow: hidden;

	& img {
		height: auto;
	}
`;

export const UserWrap = styled.div<NavOptionProps>`
	display: flex;
	justify-content: start;
	align-items: center;
	width: 100%;
	margin: 8px 0px 0px 8px;

	& div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: ${(props) =>
			props.$isTablet ? '28px' : props.$isMobile ? '28px' : '30px'};
		height: ${(props) =>
			props.$isTablet ? '28px' : props.$isMobile ? '28px' : '30px'};
		margin-right: 8px;
		border: 1px solid gray;
		border-radius: 50%;
		cursor: pointer;
	}

	& span {
		font-size: ${(props) =>
			props.$isTablet ? '14px' : props.$isMobile ? '14px' : '16px'};
	}

	& img {
		border-radius: 50%;
	}
`;
