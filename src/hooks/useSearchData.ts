import { useQuery } from 'react-query';
import { searchBoard } from '../api/communityApi';
import { RootState } from '../types/BoardTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SET_IS_SEARCH } from '../slice/communitySlice';
import labelMappings from '../utils/communityLabel';

const useSearchData = () => {
	const dispatch = useDispatch();

	const displayLabel = useSelector(
		(state: RootState) => state.community.displayLabel,
	);

	const mapping = displayLabel
		? labelMappings[displayLabel as keyof typeof labelMappings]
		: undefined;
	const boardType = mapping?.boardType;

	const searchText = useSelector(
		(state: RootState) => state.community.searchText,
	);

	const fetchSearchBoard = async () => {
		const response = await searchBoard(boardType, searchText);

		console.log('response', response);

		return response;
	};

	const { data: searchData } = useQuery('searchBoard', fetchSearchBoard);

	const isSearch = useSelector((state: RootState) => state.community.isSearch);

	useEffect(() => {
		dispatch(SET_IS_SEARCH(false));
	}, []);

	return { isSearch, searchData };
};

export default useSearchData;
