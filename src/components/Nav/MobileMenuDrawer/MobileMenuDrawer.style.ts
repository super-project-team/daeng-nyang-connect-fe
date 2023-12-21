import styled from 'styled-components';

interface H3Props {
	margin?: string;
}

export const MobileDrawerDiv = styled.div`
	position: relative;
	left: 30%;
	width: 70%;
	height: 100vh;
	padding: 60px 30px 0;
	background-color: #fff;
`;
export const MobileDrawerH3 = styled.h3<H3Props>`
	margin-bottom: ${(props) => (props.margin ? props.margin : '16px')};
	font-weight: 400;
	img {
		width: 100px;
		margin-bottom: 20px;
	}
`;
export const MobileDrawerFirstLi = styled.li`
	margin-bottom: 16px;
	ul {
		margin-top: 8px;
		padding-left: 8px;
		li {
			position: relative;
			margin-bottom: 4px;
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				right: 101%;
				transform: translateX(-50%);
				width: 2px;
				height: 2px;
				background-color: var(--color-teal);
				border-radius: 50%;
			}
		}
		.second-depth {
			font-size: 12px;
			color: var(--color-teal);
		}
	}
	p {
		margin-left: 16px;
	}
`;
export const UserImgDiv = styled.div`
	width: 80px;
	height: 80px;
	margin-bottom: 10px;
	border-radius: 50%;
	overflow: hidden;
	img {
		height: 100%;
	}
`;
export const UserNameEm = styled.em`
	font-size: 10px;
	color: var(--color-teal);
`;
export const CloseDiv = styled.div`
	position: absolute;
	top: 10px;
	right: 30px;
	width: 30px;
	height: 30px;
	svg {
		width: 100%;
		height: 100%;
	}
`;
