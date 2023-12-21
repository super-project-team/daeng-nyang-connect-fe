/* eslint-disable react/prop-types */
import { BsBookmarkFill } from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemBox, ItemList } from '../NewFamily.style';
import { useDispatch } from 'react-redux';
import { SET_ANIMALS } from '../../../slice/newFamilySlice';
import { useQuery } from 'react-query';
import { getNewFamily } from '../../../api/newFamilyApi';

interface Item {
	boardId: number;
	index: number;
	animalName: string;
	age: string;
	images: string[];
}

interface ResponsiveProps {
	$isMobile: boolean;
	$isTablet: boolean;
	$isPc: boolean;
	$isMaxWidth: boolean;
}

const NewFamilyList: React.FC<ResponsiveProps> = ({
	$isMobile,
	$isTablet,
	$isPc,
	$isMaxWidth,
}) => {
	const navigate = useNavigate();

	const { data: items } = useQuery<Item[], unknown, Item[]>(
		['getNewFamily'],
		getNewFamily,
	);

	const [bookmarkState, setBookmarkState] = useState<{
		[key: number]: boolean;
	}>({});

	const clickBookmarkHandler = (itemId: number) => {
		setBookmarkState((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
	};

	const goToDetailPage = (petId: number) => {
		navigate(`/newFamily/pet/${petId}`);
	};

	const getBookmarkSize = () => {
		if ($isMobile) return 25;
		if ($isTablet) return 30;
		if ($isPc) return 30;
	};

	return (
		<ItemList
			$isMobile={$isMobile}
			$isTablet={$isTablet}
			$isPc={$isPc}
			$isMaxWidth={$isMaxWidth}>
			{items?.map((animal: Item) => (
				<ItemBox
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}
					key={animal.boardId}
					onClick={() => goToDetailPage(animal.boardId)}>
					<div>
						<img src={animal.images[0]} alt={`adoption${animal.boardId}`} />
						<BsBookmarkFill
							color={
								bookmarkState[animal.boardId]
									? 'var(--color-light-salmon)'
									: '#ffffff70'
							}
							size={getBookmarkSize()}
							onClick={(e) => {
								e.stopPropagation();
								clickBookmarkHandler(animal.boardId);
							}}
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
	);
};

export default NewFamilyList;
