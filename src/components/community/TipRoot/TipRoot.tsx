import { Article, TipLists, TipsNav } from './TipRoot.style';
import TipList from './TipList/TipList';
import Pagination from '../../Pagination/Pagination';
import usePagination from '../../../hooks/usePagination';
import { useResponsive } from '../../../hooks/useResponsive';
import { getAllBoard, getSize } from '../../../api/communityApi';
import { useQuery } from 'react-query';
import { Board } from '../../../types/BoardTypes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommunityState, SET_IS_LOADING } from '../../../slice/communitySlice';
import useSearchData from '../../../hooks/useSearchData';

export interface MyTip {
	id: number;
	title: string;
	nickname: string;
	createdAt: string;
	like: number;
}
interface RootState {
	community: CommunityState;
}

const TipRoot = () => {
	const { $isMobile } = useResponsive();
	const [totalBoardSize, setTotalBoardSize] = useState(0);
	const dispatch = useDispatch();

	const category = useSelector(
		(state: RootState) => state.community.subCategory,
	);

	const [filteredData, setFilteredData] = useState<Board[]>([]);

	const fetchGetAllTipBoard = async (): Promise<Board[]> => {
		const response = await getAllBoard('tips', String(currentPage));

		return response;
	};

	const fetchGetAllBoardSize = async () => {
		const response = await getSize('tips');

		setTotalBoardSize(response?.size);

		return response?.size;
	};

	const { data, isLoading } = useQuery<Board[]>(
		'tipAllBoard',
		fetchGetAllTipBoard,
	);

	const itemsPerPage = 20;
	const { currentPage, pageRange, handlePageClick, handlePrevNextClick } =
		usePagination(totalBoardSize, itemsPerPage);

	useEffect(() => {
		fetchGetAllBoardSize();
	}, []);

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

	const { searchData, isSearch } = useSearchData();

	useEffect(() => {
		dispatch(SET_IS_LOADING(isLoading));
	}, [isLoading]);

	return (
		<>
			<Article $isMobile={$isMobile}>
				<TipsNav $isMobile={$isMobile}>
					<div>제목</div>
					<div>글쓴이</div>
					<div>작성날짜</div>
					<div>좋아요</div>
				</TipsNav>
				<TipLists $isMobile={$isMobile}>
					{isSearch
						? Array.isArray(searchData) &&
						  searchData.map(
								(list) =>
									'boardId' in list && (
										<TipList key={list.boardId} list={list} />
									),
						  )
						: category === ''
						  ? data?.map(
									(list) =>
										'boardId' in list && (
											<TipList key={list.boardId} list={list} />
										),
						    )
						  : filteredData?.map(
									(list) =>
										'boardId' in list && (
											<TipList key={list.boardId} list={list} />
										),
						    )}
				</TipLists>
				<Pagination
					currentPage={currentPage}
					pageRange={pageRange}
					onPrevClick={() => handlePrevNextClick('prev')}
					onNextClick={() => handlePrevNextClick('next')}
					onPageClick={handlePageClick}
				/>
			</Article>
		</>
	);
};

export default TipRoot;
