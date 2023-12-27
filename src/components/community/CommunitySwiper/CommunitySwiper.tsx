import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import { ImgWrap, StyledSwiperWrapper } from './CommunitySwiper.style';
import { BoardDetailImg, LostImage } from '../../../types/BoardTypes';

interface CommunitySwiperProps {
	images: BoardDetailImg[] | string[] | LostImage[] | undefined;
}

const CommunitySwiper = ({ images }: CommunitySwiperProps) => {
	return (
		<StyledSwiperWrapper>
			<Swiper
				loop={true}
				slidesPerView={1}
				grabCursor={true}
				allowTouchMove={true}
				cssMode={false}
				navigation={true}
				modules={[Navigation, Mousewheel]}
				mousewheel={{ forceToAxis: true }}
				className="main-img-swiper">
				{images && images.length > 0 ? (
					images.map((image, index) => {
						const imageUrl = typeof image === 'string' ? image : image.url;
						return (
							<SwiperSlide key={index}>
								<ImgWrap>
									<img src={imageUrl} alt="" />
								</ImgWrap>
							</SwiperSlide>
						);
					})
				) : (
					<SwiperSlide>
						<ImgWrap>
							<img
								src="/assets/LOGO.svg"
								alt="기본 이미지"
								className="default-image"
							/>
						</ImgWrap>
					</SwiperSlide>
				)}
			</Swiper>
		</StyledSwiperWrapper>
	);
};

export default CommunitySwiper;
