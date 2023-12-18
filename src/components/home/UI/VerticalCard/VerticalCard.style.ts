import styled from 'styled-components';

type VerticalCardProps = {
	$isMobile?: boolean;
};

export const CardDiv = styled.div<VerticalCardProps>`
	width: ${(props) => (props.$isMobile ? '98%' : '90%')};
	height: 450px;
	border-radius: 30px;
	background-color: #fff;
	margin: ${(props) => (!props.$isMobile ? 'auto' : null)};
	overflow: hidden;
	cursor: pointer;
`;
export const CardImgDiv = styled.div`
	position: relative;
	width: 100%;
	height: 70%;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}
	.complete-icon {
		position: absolute;
		bottom: 10px;
		right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;
		border: 3px solid var(--color-light-salmon);
		border-radius: 50%;
		svg {
			width: 60%;
			height: 60%;
			color: var(--color-light-salmon);
		}
	}
`;
export const CardTextDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: calc(450px - 70%);
	padding: 20px;
	line-height: 22px;
`;

export const CardBtn = styled.button`
	align-self: end;
	padding: 4px 20px;
	border: 1px solid #ffe1d6;
	border-radius: 4px;
	color: var(--color-deep-blue);
`;
