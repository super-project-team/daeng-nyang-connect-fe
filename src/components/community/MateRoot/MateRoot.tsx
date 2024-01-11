import MateList from './MateList/MateList';
import { MateLists } from './MateRoot.style';
import Pagination from '../../Pagination/Pagination';
import usePagination from '../../../hooks/usePagination';
import { useResponsive } from '../../../hooks/useResponsive';
import { getAllBoard, getSize } from '../../../api/communityApi';
import { Board } from '../../../types/BoardTypes';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommunityState, SET_IS_LOADING } from '../../../slice/communitySlice';
import useSearchData from '../../../hooks/useSearchData';

interface RootState {
	community: CommunityState;
}

const MateRoot = () => {
	const [filteredData, setFilteredData] = useState<Board[]>([]);
	const [totalBoardSize, setTotalBoardSize] = useState(0);

	const dispatch = useDispatch();

	const category = useSelector(
		(state: RootState) => state.community.subCategory,
	);

	const { $isTablet, $isMobile } = useResponsive();

	const fetchGetAllMateBoard = async (): Promise<Board[]> => {
		const response = await getAllBoard('mate', String(currentPage));

		return response;
	};

	const fetchGetAllBoardSize = async () => {
		const response = await getSize('mate');

		setTotalBoardSize(response?.size);

		return response?.size;
	};

	const { data, isLoading } = useQuery<Board[]>(
		'mateAllBoard',
		fetchGetAllMateBoard,
	);

	const itemsPerPage = 12;
	const { currentPage, pageRange, handlePageClick, handlePrevNextClick } =
		usePagination(totalBoardSize, itemsPerPage);

	useEffect(() => {
		fetchGetAllBoardSize();
	}, []);

	useEffect(() => {
		if (data) {
			const filteredData = (data as Board[]).filter((item) => {
				if (category === null) {
					return item;
				} else {
					return item.category === category;
				}
			});
			setFilteredData(filteredData);
		}
	}, [data, category]);

	const { searchData, isSearch } = useSearchData();

	useEffect(() => {
		dispatch(SET_IS_LOADING(isLoading));
	}, [isLoading]);

	return (
		<>
			<MateLists $isMobile={$isMobile} $isTablet={$isTablet}>
				{isSearch
					? Array.isArray(searchData) &&
					  searchData.map(
							(list) =>
								'boardId' in list && (
									<MateList key={list.boardId} list={list} />
								),
					  )
					: category === ''
					  ? data?.map((list) => {
								if ('boardId' in list) {
									return <MateList key={list.boardId} list={list} />;
								}
					    })
					  : filteredData &&
					    filteredData.map((list) => {
								if ('boardId' in list) {
									return <MateList key={list.boardId} list={list} />;
								}
					    })}
			</MateLists>
			<Pagination
				currentPage={currentPage}
				pageRange={pageRange}
				onPrevClick={() => handlePrevNextClick('prev')}
				onNextClick={() => handlePrevNextClick('next')}
				onPageClick={handlePageClick}
			/>
		</>
	);
};

export default MateRoot;
