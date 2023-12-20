import MyPetList from './MyPetList/MyPetList';
import { MyPetLists } from './MyPetRoot.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { getAllBoard } from '../../../api/communityApi';
import { useQuery } from 'react-query';
import { Board } from '../../../types/BoardTypes';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import useSearchData from '../../../hooks/useSearchData';

const MyPetRoot = () => {
	const { $isTablet, $isMobile } = useResponsive();

	const fetchGetAllMyPetBoard = async (): Promise<Board[]> => {
		const response = await getAllBoard('my_pet');

		return response;
	};

	const { data, refetch, isLoading } = useQuery<Board[]>(
		'myPetAllBoard',
		fetchGetAllMyPetBoard,
	);

	const visibleData = useInfiniteScroll(data, refetch, 6);

	const { searchData, isSearch } = useSearchData();

	if (isSearch) {
		return (
			<MyPetLists $isTablet={$isTablet} $isMobile={$isMobile}>
				{Array.isArray(searchData) &&
					searchData.map((list) => {
						if ('boardId' in list) {
							return <MyPetList key={list.boardId} list={list} />;
						}
					})}
			</MyPetLists>
		);
	} else {
		return (
			<>
				{isLoading && <section>로딩 중...</section>}
				<MyPetLists $isTablet={$isTablet} $isMobile={$isMobile}>
					{Array.isArray(visibleData) &&
						visibleData.map((list) => {
							if ('boardId' in list) {
								return <MyPetList key={list.boardId} list={list} />;
							}
						})}
				</MyPetLists>
			</>
		);
	}
};

export default MyPetRoot;
