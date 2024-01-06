import { css, styled } from 'styled-components';

type Props = {
	img?: string;
	$isTablet?: boolean;
	$isMobile?: boolean;
};

export const CommunityLi = styled.li<Props>`
	position: relative;
	width: ${(props) => (props.$isMobile ? '50%' : '25%')};
	height: ${(props) => (props.$isMobile ? '250px' : '350px')};
	cursor: pointer;
	overflow: hidden;
	.li-link {
		&:hover {
			div {
				background-size: auto 110%;
			}
		}
	}
`;

export const CommunityImgDiv = styled.div<Props>`
	width: ${(props) =>
		props.$isTablet ? '180px' : props.$isMobile ? '100%' : '240px'};
	height: ${(props) =>
		props.$isTablet ? '180px' : props.$isMobile ? '100%' : '240px'};
	margin: 0 auto 24px;
	border-radius: ${(props) => (props.$isMobile ? null : '50%')};
	overflow: hidden;
	&:hover {
		img {
			scale: 1.1;
		}
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.2s ease-in;
	}
`;
export const CommunityTitleDt = styled.dt<Props>`
	margin-bottom: 8px;
	font-size: ${(props) => (props.$isMobile ? '14px' : '20px')};
	font-weight: 400;
	color: ${(props) => props.$isMobile && '#fff'};
	background: ${(props) => (props.$isMobile ? 'rgba(0, 0, 0, 0.2)' : null)};
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MobileDl = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;
export const CommunityTextDl = styled.dl<Props>`
	${(props) => (props.$isMobile ? MobileDl : null)}
`;
