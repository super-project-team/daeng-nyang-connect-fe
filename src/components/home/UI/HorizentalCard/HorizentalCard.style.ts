import styled from 'styled-components';

type HorizentalCardProps = {
	$isMobile?: boolean;
};

export const HorizentalCardLi = styled.li<HorizentalCardProps>`
	display: flex;
	width: 100%;
	height: ${(props) => (props.$isMobile ? '200px' : '280px')};
	border-radius: 30px;
	box-shadow: 1px 0 8px 0 #9e848d50;
	overflow: hidden;
	cursor: pointer;
`;
export const HorizentalCardImgDiv = styled.div`
	width: 50%;
	height: 100%;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}
`;
export const HorizentalCardTextBox = styled.div`
	display: -webkit-box;
	height: 110px;
	line-height: 22px;
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
`;
export const HorizentalCardTextDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 50%;
	padding: 20px;
`;
export const HorizentalCardTextDesP = styled.p<HorizentalCardProps>`
	font-size: ${(props) => (props.$isMobile ? '12px' : '14px')};
`;
