import React, { useState, useEffect } from 'react';
import { Wrapper } from './MyPost.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { getMyBoard } from '../../../api/myPageApi';
import { PostBoard } from '../../../types/BoardTypes';

const MyPost: React.FC = () => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const [tipsPosts, setTipsPosts] = useState<PostBoard[]>([]);
	const [matePosts, setMatePosts] = useState<PostBoard[]>([]);
	const [myPetPosts, setMyPetPosts] = useState<PostBoard[]>([]);
	const [reviewPosts, setReviewPosts] = useState<PostBoard[]>([]);
	const [selectedPage, setSelectedPage] = useState<string>('tips');

	const getMyPost = async () => {
		try {
			const response = await getMyBoard();
			console.log(response);
			if (response) {
				setTipsPosts(response.tips);
				setMatePosts(response.mate);
				setMyPetPosts(response.myPet);
				setReviewPosts(response.review);
			}
		} catch (error) {
			// 에러 처리
		}
	};

	useEffect(() => {
		getMyPost();
	}, []);

	const filteredPosts = (): PostBoard[] => {
		switch (selectedPage) {
			case 'tips':
				return tipsPosts;
			case 'mate':
				return matePosts;
			case 'myPet':
				return myPetPosts;
			case 'review':
				return reviewPosts;
			default:
				return [];
		}
	};

	return (
		<Wrapper>
			<select onChange={(e) => setSelectedPage(e.target.value)}>
				<option value="tips">팁</option>
				<option value="mate">메이트</option>
				<option value="myPet">내 애완동물</option>
				<option value="review">리뷰</option>
			</select>
			<div>
				{/* {filteredPosts().map((post) => (

				))} */}
			</div>
		</Wrapper>
	);
};

export default MyPost;
