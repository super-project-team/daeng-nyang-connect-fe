import { useQuery } from 'react-query';
import { getAllBoard } from '../../../api/communityApi';
import { useResponsive } from '../../../hooks/useResponsive';
import { Board, RootState } from '../../../types/BoardTypes';
import LostList from './LostList/LostList';
import { LostLists } from './LostRoot.style';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import useSearchData from '../../../hooks/useSearchData';
import { SET_IS_LOADING } from '../../../slice/communitySlice';

const LostRoot = () => {
	const { $isTablet, $isMobile } = useResponsive();
	const dispatch = useDispatch();

	const category = useSelector(
		(state: RootState) => state.community.subCategory,
	);

	const [filteredData, setFilteredData] = useState<Board[]>([]);

	const fetchGetAllLostBoard = async (): Promise<Board[]> => {
		const response = await getAllBoard('lost');

		return response;
	};

	const { data, refetch, isLoading } = useQuery<Board[]>(
		'lostAllBoard',
		fetchGetAllLostBoard,
	);

	const { searchData, isSearch } = useSearchData();

	useEffect(() => {
		if (Array.isArray(data)) {
			const filteredData = (data as Board[])?.filter((item) => {
				if (category === null) {
					return item;
				} else {
					return item.category === category;
				}
			});
			setFilteredData(filteredData);
		}
	}, [data, category]);

	const visibleData = useInfiniteScroll(data, refetch, 6);
	const visibleFilteredData = useInfiniteScroll(filteredData, refetch, 6);

	useEffect(() => {
		dispatch(SET_IS_LOADING(isLoading));
	}, [isLoading]);

	return (
		<LostLists $isMobile={$isMobile} $isTablet={$isTablet}>
			{isSearch
				? Array.isArray(searchData) &&
				  searchData.map(
						(list) =>
							'boardId' in list && <LostList key={list.boardId} list={list} />,
				  )
				: category === ''
				  ? visibleData?.map(
							(list) =>
								'boardId' in list && (
									<LostList key={list.boardId} list={list} />
								),
				    )
				  : visibleFilteredData?.map(
							(list) =>
								'boardId' in list && (
									<LostList key={list.boardId} list={list} />
								),
				    )}
		</LostLists>
	);
};

export default LostRoot;
