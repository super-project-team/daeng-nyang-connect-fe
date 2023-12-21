import React, { useEffect, useState } from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { ListDiv, ListWrapper, Wrapper } from './Liked.style';
import { getMyLiked } from '../../../api/myPageApi';

interface LikedItem {
	boardId?: number; // 또는 다른 적절한 유형으로 변경
	tipsBoardId?: number; // 또는 다른 적절한 유형으로 변경
	myPetBoardId?: number; // 또는 다른 적절한 유형으로 변경
	title: string;
	text?: string;
	// 기타 필요한 속성들을 추가하세요
}

const Liked: React.FC = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const [likedItems, setLikedItems] = useState<LikedItem[]>([]);

	const [loading, setLoading] = useState(true);

	const getLiked = async () => {
		try {
			const response = await getMyLiked();
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
				) : likedItems.length === 0 ? (
					<p>좋아요한 개시물이 없습니다.</p>
				) : (
					likedItems.map((item) => (
						<ListDiv
							key={item.boardId || item.tipsBoardId || item.myPetBoardId}
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							<div>
								<strong>
									{item.title ||
										(item.text && item.text.substring(0, 10) + '...')}
								</strong>
								{item.title && <p>{item.text?.substring(0, 10) + '...'}</p>}
							</div>
							{/* 표시하려는 다른 세부 정보를 추가하세요 */}
						</ListDiv>
					))
				)}
			</ListWrapper>
		</Wrapper>
	);
};

export default Liked;
