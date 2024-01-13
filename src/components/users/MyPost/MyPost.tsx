import React, { useState, useEffect } from 'react';
import { ListDiv, ListWrapper, Wrapper } from './MyPost.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { getMyBoard } from '../../../api/myPageApi';
import { PostBoard } from '../../../types/BoardTypes';

const MyPost: React.FC = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const [loading, setLoading] = useState(true);
	const [myPosts, setMyPosts] = useState<{ [key: string]: PostBoard[] }>({});

	const getMyPost = async () => {
		try {
			const response = await getMyBoard();
			setMyPosts(response);
		} catch (error) {
			// 에러 처리
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMyPost();
	}, []);

	const hasAnyPost = Object.keys(myPosts).some(
		(category) => myPosts[category]?.length > 0,
	);

	return (
		<Wrapper>
			<ListWrapper>
				{loading ? (
					<p>Loading...</p>
				) : !hasAnyPost ? (
					<p>작성한 글이 없습니다.</p>
				) : (
					Object.keys(myPosts).map((category) => (
						<div key={category}>
							<h2>{category}</h2>
							{myPosts[category] &&
								myPosts[category].map((item, index) => (
									<div key={index}>
										<ListDiv
											$isMobile={$isMobile}
											$isTablet={$isTablet}
											$isPc={$isPc}
											$isMaxWidth={$isMaxWidth}>
											<div>{item.category || '기본 카테고리'}</div>
											{item.title ||
												(item.text && item.text.length <= 30
													? item.text
													: item.text?.substring(0, 30) + '...')}
										</ListDiv>
									</div>
								))}
						</div>
					))
				)}
			</ListWrapper>
		</Wrapper>
	);
};

export default MyPost;
