import { useNavigate } from 'react-router-dom';
import { ImageWrap, MyPetLi, UserWrap } from './MyPetList.style';
import { useResponsive } from '../../../../hooks/useResponsive';
import { Board } from '../../../../types/BoardTypes';

interface MyPetListProps {
	list: Board;
}

const MyPetList = ({ list }: MyPetListProps) => {
	const navigate = useNavigate();
	const { $isMobile, $isTablet } = useResponsive();

	const moveToTheDetailPage = (id: number) => {
		navigate(`/community/myPets/myPet/${id}`);
	};

	const isDefaultImage =
		list.img && list.img.length > 0 ? list.img[0] : '/assets/LOGO.svg';

	return (
		<MyPetLi $isMobile={$isMobile}>
			<ImageWrap onClick={() => moveToTheDetailPage(list.boardId)}>
				<img
					src={isDefaultImage}
					alt=""
					className={
						isDefaultImage === '/assets/LOGO.svg' ? 'default-image' : ''
					}
				/>
			</ImageWrap>
			<UserWrap $isMobile={$isMobile} $isTablet={$isTablet}>
				<div>
					<img src={list.userThumbnail} alt="" />
				</div>
				<span>{list.nickname}</span>
			</UserWrap>
		</MyPetLi>
	);
};

export default MyPetList;
