import { BsBookmarkFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import { DetailSwiper } from '../NewFamily.style';
import { useResponsive } from '../../../hooks/useResponsive';
import {
	getNewFamily,
	getScrappedAnimal,
	scrapAnimal,
} from '../../../api/newFamilyApi';
import { useQuery } from 'react-query';
import { PiPawPrintFill } from 'react-icons/pi';
SwiperCore.use([Autoplay]);
interface Item {
	boardId: number;
	index: number;
	animalName: string;
	age: string;
	adoptionStatus: string;
	images: string[];
	animalId: number;
	createdAt: string;
	kind: string;
	city: string;
}

interface ResponsiveProps {
	$isMobile: boolean;
	$isTablet: boolean;
	$isPc: boolean;
	$isMaxWidth: boolean;
}

const generateImgUrl = (index: number): string => {
	const maxIndex = 4;
	const actualIndex = index <= maxIndex ? index : (index % maxIndex) + 1;
	return `/assets/animal${actualIndex}.jpg`;
};

SwiperCore.use([Autoplay]);

const NewFamilySwiper = () => {
	const navigate = useNavigate();
	const [swiper, setSwiper] = useState<SwiperCore | null>(null);
	const [bookmarkState, setBookmarkState] = useState<{
		[key: number]: boolean;
	}>({});

	//전체 데이터 조희
	const { data: items, refetch } = useQuery<Item[], unknown, Item[]>(
		['animals'],
		getNewFamily,
	);

	//북마크된 동물정보 불러오기(-> UI에 반영)
	useEffect(() => {
		const fetchScrappedAnimals = async () => {
			try {
				const scrappedAnimalsData = await getScrappedAnimal();
				if (scrappedAnimalsData) {
					const initialState = scrappedAnimalsData.reduce(
						(
							acc: { [key: number]: boolean },
							animal: { animalId?: number },
						) => {
							if (animal.animalId !== undefined) {
								acc[animal.animalId] = true;
							}
							return acc;
						},
						{},
					);
					setBookmarkState(initialState);
				} else {
					console.error('동물데이터가 정의 안 됨');
				}
			} catch (error) {
				console.error('스크랩목록 가져오기 실패:', error);
			}
		};
		fetchScrappedAnimals();
	}, []);

	//북마크 추가
	const toggleBookmark = async (boardId: number) => {
		try {
			const updatedBookmarkState = { ...bookmarkState };

			if (updatedBookmarkState[boardId]) {
				delete updatedBookmarkState[boardId];
			} else {
				updatedBookmarkState[boardId] = true;
			}
			setBookmarkState(updatedBookmarkState);
			await scrapAnimal(boardId);
			refetch();
		} catch (error) {
			console.error('북마크 오류', error);
		}
	};

	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const clickBookmarkHandler = (itemId: number) => {
		setBookmarkState((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
	};

	const initSwiper = (swiper: SwiperCore) => {
		setSwiper(swiper);
	};

	const mouseEnterHandler = () => {
		if (swiper) {
			swiper.autoplay.stop();
		}
	};
	const mouseLeaveHandler = () => {
		if (swiper) {
			swiper.autoplay.start();
		}
	};

	//디테일 페이지 이동
	const goToDetailPage = (petId: number) => {
		navigate(`/newFamily/pet/${petId}`);
	};

	//디바이스에 따른 아이콘 사이즈 조정
	const getBookmarkSize = () => ($isMobile ? 25 : 30);
	const getAdoptionStatusSize = () => ($isMobile ? 20 : 30);

	//북마크컬러변경
	const getBookmarkColor = (boardId: number) => {
		return bookmarkState[boardId] ? 'var(--color-light-salmon)' : '#ffffff70';
	};

	return (
		<DetailSwiper
			$isMobile={$isMobile}
			$isTablet={$isTablet}
			$isPc={$isPc}
			$isMaxWidth={$isMaxWidth}
			onMouseEnter={mouseEnterHandler}
			onMouseLeave={mouseLeaveHandler}>
			<Swiper
				loop={true}
				autoplay={{ delay: 2500, disableOnInteraction: false }}
				speed={3500}
				spaceBetween={30}
				slidesPerView={$isMaxWidth ? 4 : 5}
				slidesPerGroup={1}
				slidesPerGroupSkip={1}
				freeMode={true}
				grabCursor={true}
				allowTouchMove={true}
				modules={[Autoplay]}
				onSwiper={initSwiper}
				className="swiper">
				{items?.map((animal: Item) => (
					<SwiperSlide
						key={animal.boardId}
						className="swiper-slide"
						onClick={() => goToDetailPage(animal.boardId)}>
						<div>
							<img src={animal.images[0]} alt="{`adoption${animal.boardId}`}" />
							{animal.adoptionStatus === 'COMPLETED' && (
								<div className="adoption-status-icon">
									<PiPawPrintFill
										size={getAdoptionStatusSize()}
										color="var(--color-light-salmon)"
									/>
								</div>
							)}
							<BsBookmarkFill
								color={getBookmarkColor(animal.boardId)}
								size={getBookmarkSize()}
								onClick={(e) => {
									e.stopPropagation();
									toggleBookmark(animal.boardId);
								}}
								className="bookmark-icon"
							/>
						</div>
						<div>
							<p>이름 : {animal.animalName}</p>
							<p>나이 : {animal.age}개월</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</DetailSwiper>
	);
};

export default NewFamilySwiper;
