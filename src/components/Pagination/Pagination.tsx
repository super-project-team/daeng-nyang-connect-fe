import {
	ButtonWrap,
	StyledFaAngleLeft,
	StyledFaAngleRight,
} from './Pagination.style';

interface PaginationProps {
	currentPage: number;
	pageRange: number[];
	onPageClick: (pageNumber: number) => void;
	onPrevClick: () => void;
	onNextClick: () => void;
}

const Pagination = ({
	currentPage,
	pageRange,
	onPageClick,
	onPrevClick,
	onNextClick,
}: PaginationProps) => {
	return (
		<ButtonWrap>
			<button onClick={onPrevClick}>
				<StyledFaAngleLeft />
			</button>
			{pageRange.map((pageNumber) => (
				<button
					key={pageNumber}
					disabled={currentPage === pageNumber}
					onClick={() => onPageClick(pageNumber)}>
					<span className={currentPage === pageNumber ? 'current-page' : ''}>
						{pageNumber + 1}
					</span>
				</button>
			))}
			<button onClick={onNextClick}>
				<StyledFaAngleRight />
			</button>
		</ButtonWrap>
	);
};

export default Pagination;
