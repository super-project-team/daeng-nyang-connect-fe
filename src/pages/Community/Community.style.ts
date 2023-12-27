import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

export const CommunitySection = styled.section`
	position: relative;
	width: 100%;
	max-width: 1320px;
	margin: auto;
	margin-top: 60px;
`;

export const StyledFaArrowUp = styled(FaArrowUp)`
	font-size: 24px;
`;

export const ArrowButtonWrap = styled.div`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	bottom: 30px;
	right: 12px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: var(--color-peach);
	cursor: pointer;
	z-index: 30000;
`;
