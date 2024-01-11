import MyPetList from './MyPetList/MyPetList';
import { MyPetLists } from './MyPetRoot.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { getAllBoard } from '../../../api/communityApi';
import { useQuery } from 'react-query';
import { Board } from '../../../types/BoardTypes';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import useSearchData from '../../../hooks/useSearchData';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_IS_LOADING } from '../../../slice/communitySlice';

const MyPetRoot = () => {
	const { $isTablet, $isMobile } = useResponsive();
	const dispatch = useDispatch();

	const fetchGetAllMyPetBoard = async (): Promise<Board[]> => {
		const response = await getAllBoard('my_pet');

		return response;
	};

	const { data, refetch, isLoading } = useQuery<Board[]>(
		'myPetAllBoard',
		fetchGetAllMyPetBoard,
	);

	useEffect(() => {
		dispatch(SET_IS_LOADING(isLoading));
	}, [isLoading]);

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
