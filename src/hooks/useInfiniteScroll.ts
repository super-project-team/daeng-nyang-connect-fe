import { useEffect, useState } from 'react';
import { Board } from '../types/BoardTypes';

const useInfiniteScroll = (
	data: Board[] | undefined,
	refetch: () => void,
	itemsPerPage: number,
) => {
	const [visibleData, setVisibleData] = useState<Board[] | undefined>([]);
	const [page, setPage] = useState(1);
	const [lastScrollTop, setLastScrollTop] = useState(0);

	useEffect(() => {
		if (data) {
			setVisibleData(data.slice(0, itemsPerPage * page));
		}
	}, [data, page]);

	const handleScroll = () => {
		const currentScrollTop =
			window.pageYOffset || document.documentElement.scrollTop;

		if (currentScrollTop > lastScrollTop) {
			const bottomReached =
				window.innerHeight + currentScrollTop >=
				document.documentElement.offsetHeight - 120;
			if (bottomReached) {
				setPage((prevPage) => prevPage + 1);
			}
		}

		setLastScrollTop(currentScrollTop);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollTop, page, data]);

	return visibleData;
};

export default useInfiniteScroll;
