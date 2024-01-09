import styled from 'styled-components';

type AnimalInfoProps = {
	$isMobile: boolean;
};

export const AnimalInfoDiv = styled.div<AnimalInfoProps>`
	display: flex;
	align-items: center;
	width: calc(100% - 28px);
	height: ${(props) => (props.$isMobile ? '80px' : '100px')};
	margin: 0 14px;
	padding: 10px;
	border-radius: 8px;
	box-shadow: 0 0 3px 0 var(--color-light-salmon);
	font-size: ${(props) => (props.$isMobile ? '12px' : null)};
	line-height: 1.6;
`;
export const AnimalInfoImgDiv = styled.div<AnimalInfoProps>`
	width: ${(props) => (props.$isMobile ? '30%' : '100px')};
	height: 100%;
	border-radius: 4px;
	margin-right: 10px;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}
`;
export const AnimalInfoTextDiv = styled.div`
	flex: 1 0 auto;
`;
export const BtnDiv = styled.div`
	align-self: end;
`;
export const CompleteBtn = styled.button<AnimalInfoProps>`
	padding: ${(props) => (props.$isMobile ? '3px 12px' : '6px 20px')};
	border: 1px solid var(--color-light-salmon);
	border-radius: 8px;
	font-size: ${(props) => (props.$isMobile ? '10px' : null)};
	transition: all 0.3s ease;
	cursor: pointer;
	&:hover {
		background-color: var(--color-light-salmon);
		color: #fff;
	}
`;
