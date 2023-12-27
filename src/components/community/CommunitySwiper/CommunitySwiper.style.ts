import styled from 'styled-components';

interface NavOptionProps {
	$isTablet?: boolean;
	$isMobile?: boolean;
}

export const StyledSwiperWrapper = styled.div`
	.main-img-swiper .swiper-button-prev {
		opacity: 1;
		color: var(--color-peach);
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.main-img-swiper .swiper-button-prev:hover {
		color: #000000;
	}
	.main-img-swiper .swiper-button-next {
		opacity: 1;
		color: var(--color-peach);
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.main-img-swiper .swiper-button-next:hover {
		color: #000000;
	}

	.main-img-swiper .swiper-button-prev:after,
	.main-img-swiper .swiper-button-next:after {
		font-size: 2rem;
		font-weight: bold;
	}
`;

export const ImgWrap = styled.div<NavOptionProps>`
	width: 100%;
	& img {
		width: 100%;
		background-color: rgba(255, 127, 80, 0.1);
	}

	.default-image {
		padding: ${(props) => (props.$isMobile ? '30px' : '60px')};
	}
`;
