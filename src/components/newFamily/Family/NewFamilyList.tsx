/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	ItemBox,
	ItemList,
	ItemListWrapper,
	ListPagination,
	PageNumber,
} from '../NewFamily.style';
import { useQuery } from 'react-query';
import {
	getNewFamily,
	getScrappedAnimal,
	scrapAnimal,
} from '../../../api/newFamilyApi';
import { BsBookmarkFill } from 'react-icons/bs';
import { PiPawPrintFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';

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
	filterKind: string | null;
	filterCity: string | null;
	filterAdoptionStatus: string | null;
}

const NewFamilyList: React.FC<ResponsiveProps> = ({
	$isMobile,
	$isTablet,
	$isPc,
	$isMaxWidth,
	filterKind,
	filterCity,
	filterAdoptionStatus,
}) => {
	const navigate = useNavigate();
	const [bookmarkState, setBookmarkState] = useState<{
		[key: number]: boolean;
	}>({});
	const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 12;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	//전체 데이터 조희
	const { data: items } = useQuery<Item[], unknown, Item[]>(
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
					console.log();
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
	const clickBookmarkHandler = async (boardId: number) => {
		try {
			if (Object.prototype.hasOwnProperty.call(bookmarkState, boardId)) {
				const updatedBookmarkState = { ...bookmarkState };
				delete updatedBookmarkState[boardId];
				setBookmarkState(updatedBookmarkState);

				await scrapAnimal(boardId);
			} else {
				const updatedBookmarkState = { ...bookmarkState, [boardId]: true };
				setBookmarkState(updatedBookmarkState);

				console.log('Bookmark added for boardId:', boardId);
				console.log('Updated State:', updatedBookmarkState);

				await scrapAnimal(boardId);
			}
		} catch (error) {
			console.error('북마크오류', error);
			setBookmarkState((prev) => ({ ...prev, [boardId]: !prev[boardId] }));
		}
	};

	const renderAnimalList = () => {
		return items
			?.filter((animal) => {
				const isKindMatch = !filterKind || animal.kind === filterKind;
				const isCityMatch = !filterCity || animal.city === filterCity;
				const isAdoptionStatusMatch =
					!filterAdoptionStatus ||
					animal.adoptionStatus === filterAdoptionStatus;
				return isKindMatch && isCityMatch && isAdoptionStatusMatch;
			})
			?.sort((a, b) => b.boardId - a.boardId)
			?.slice(startIndex, endIndex);
	};

	const renderPagination = () => {
		const totalPages = Math.ceil((items?.length ?? 0) / itemsPerPage);
		return (
			<ListPagination>
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}>
					&lt;
				</button>
				{Array(totalPages)
					.fill(null)
					.map((_, pageIndex) => {
						const page = pageIndex + 1;
						const isFirstPage = pageIndex === 0;
						const isLastPage = pageIndex === totalPages - 1;
						const isInRange =
							pageIndex >= currentPage - 2 && pageIndex <= currentPage + 2;

						if (isFirstPage || isLastPage || isInRange) {
							return (
								<PageNumber
									key={pageIndex}
									isActive={currentPage === page}
									onClick={() => setCurrentPage(page)}>
									{page}
								</PageNumber>
							);
						} else if (pageIndex === currentPage + 3) {
							// Render an ellipsis (...) after the current page if there are more pages
							return <span key="ellipsis">...</span>;
						}
						return null;
					})}
				<button
					disabled={endIndex >= (items?.length ?? 0)}
					onClick={() => setCurrentPage(currentPage + 1)}>
					&gt;
				</button>
			</ListPagination>
		);
	};

	const renderBookmarkIcon = (boardId: number) => {
		return (
			<BsBookmarkFill
				color={getBookmarkColor(boardId)}
				size={getBookmarkSize()}
				onClick={(e) => {
					e.stopPropagation();
					clickBookmarkHandler(boardId);
				}}
				className="bookmark-icon"
			/>
		);
	};

	const renderAdoptionStatusIcon = (animalId: number) => {
		return (
			<PiPawPrintFill
				size={getAdoptionStatusSize()}
				color="var(--color-light-salmon)"
			/>
		);
	};

	//북마크컬러변경
	const getBookmarkColor = (boardId: number) => {
		return bookmarkState[boardId] ? 'var(--color-light-salmon)' : '#ffffff70';
	};

	//디테일 페이지 이동
	const goToDetailPage = (petId: number) => {
		navigate(`/newFamily/pet/${petId}`);
	};

	//디바이스에 따른 아이콘 사이즈 조정
	const getBookmarkSize = () => ($isMobile ? 25 : 30);
	const getAdoptionStatusSize = () => ($isMobile ? 20 : 30);

	return (
		<ItemListWrapper>
			<ItemList
				$isMobile={$isMobile}
				$isTablet={$isTablet}
				$isPc={$isPc}
				$isMaxWidth={$isMaxWidth}>
				{renderAnimalList()?.map((animal: Item) => (
					<ItemBox
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						key={animal.boardId}
						onClick={() => goToDetailPage(animal.boardId)}>
						<div>
							<img src={animal.images[0]} alt={`adoption${animal.boardId}`} />
							{animal.adoptionStatus === 'COMPLETED' && (
								<div className="adoption-status-icon">
									{renderAdoptionStatusIcon(animal.boardId)}
								</div>
							)}
							{renderBookmarkIcon(animal.boardId)}
						</div>
						<div>
							<p>이름 : {animal.animalName}</p>
							<p>나이 : {animal.age}개월</p>
							<button onClick={() => goToDetailPage(animal.boardId)}>
								자세히 보기
							</button>
						</div>
					</ItemBox>
				))}
			</ItemList>
			{renderPagination()}
		</ItemListWrapper>
	);
};

export default NewFamilyList;
