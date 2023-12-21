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

	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 12;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

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

	useEffect(() => {
		setCurrentPage(1);
	}, [items]);

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

	const getCurrentPageItems = () => {
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
			?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	};

	const renderPagination = () => {
		const totalPages = Math.ceil((items?.length ?? 0) / itemsPerPage);

		return (
			<ListPagination>
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage((prev) => prev - 1)}>
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
							return <span key="ellipsis">...</span>;
						}
						return null;
					})}
				<button
					disabled={endIndex === totalPages}
					onClick={() => setCurrentPage((prev) => prev + 1)}>
					&gt;
				</button>
			</ListPagination>
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
				{getCurrentPageItems()?.map((animal: Item) => (
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
