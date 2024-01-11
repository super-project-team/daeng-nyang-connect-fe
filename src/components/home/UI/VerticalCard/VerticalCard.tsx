import { useNavigate } from 'react-router-dom';
import {
	CardBtn,
	CardDiv,
	CardImgDiv,
	CardTextDiv,
} from './VerticalCard.style';
import { useState } from 'react';
import { IoPaw } from 'react-icons/io5';

type FindNewProps = {
	$isMobile?: boolean;
	data: {
		boardId: number;
		animalName: string;
		age: string;
		images: string[];
		adoptionStatus: string;
	};
};

const VerticalCard = ({ $isMobile, data }: FindNewProps) => {
	const navigate = useNavigate();

	const moveToDetailHandler = () => {
		navigate(`/newFamily/pet/${data.boardId}`);
	};

	return (
		<CardDiv $isMobile={$isMobile} onClick={moveToDetailHandler}>
			<CardImgDiv>
				<img src={data.images?.[0]} alt="" />
				{data.adoptionStatus === 'COMPLETED' ? (
					<div className="complete-icon">
						<IoPaw />
					</div>
				) : null}
			</CardImgDiv>
			<CardTextDiv>
				<div>
					<p>이름 : {data.animalName}</p>
					<p>나이 : {data.age}</p>
				</div>
				<CardBtn>자세히 보기</CardBtn>
			</CardTextDiv>
		</CardDiv>
	);
};

export default VerticalCard;
