import React, { useEffect, useState } from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { ListDiv, ListWrapper, Wrapper } from './Liked.style';
import { getMyLiked } from '../../../api/myPageApi';

interface LikedItem {
	boardId?: number;
	tipsBoardId?: number;
	myPetBoardId?: number;
	title: string;
	text?: string;
	boardName: string;
}

const Liked: React.FC = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const [likedItems, setLikedItems] = useState<LikedItem[]>([]);

	const [loading, setLoading] = useState(true);

	const getLiked = async () => {
		try {
			const response = await getMyLiked();
			console.log(response);
			setLikedItems(response);
		} catch (error) {
			// 에러 처리
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getLiked();
	}, []);

	return (
		<Wrapper>
			<ListWrapper>
				{loading ? (
					<p>Loading...</p>
				) : likedItems && likedItems.length === 0 ? (
					<p>좋아요한 개시물이 없습니다.</p>
				) : (
					likedItems &&
					likedItems.map((item) => (
						<div key={item.boardId || item.tipsBoardId || item.myPetBoardId}>
							<ListDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								<div>{item.boardName}</div>
								{item.title ||
									(item.text && item.text.length <= 30
										? item.text
										: item.text?.substring(0, 30) + '...')}
							</ListDiv>
						</div>
					))
				)}
			</ListWrapper>
		</Wrapper>
	);
};

export default Liked;
