import { useNavigate } from 'react-router-dom';
import { TipLi } from './TipList.style';
import { useResponsive } from '../../../../hooks/useResponsive';
import { Board } from '../../../../types/BoardTypes';

interface MyTipListProps {
	list: Board;
}

const TipList = ({ list }: MyTipListProps) => {
	const navigate = useNavigate();

	const moveToTheDetailPage = (id: number | undefined) => {
		navigate(`/community/tips/tip/${id}`);
	};

	const { $isMobile, $isTablet } = useResponsive();

	return (
		<TipLi
			onClick={() => moveToTheDetailPage(list.boardId)}
			$isMobile={$isMobile}
			$isTablet={$isTablet}>
			<div>{list.title}</div>
			<div>{list.nickname}</div>
			<div>{list.createdAt}</div>
			<div>{list.like}</div>
		</TipLi>
	);
};

export default TipList;
