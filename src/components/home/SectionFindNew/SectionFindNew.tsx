import { MainSectionH2 } from './../Section.style';
import {
	CardListUl,
	FindNewMoreBtnDiv,
	FindNewSection,
	FindNewTitleDiv,
} from './SectionFindNew.style';
import { SalmonBtn } from '../UI/SalmonBtn/SalmonBtn.style';
import FindNewList from './FindNewList/FindNewList';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../hooks/useResponsive';
import { useQuery } from 'react-query';
import { getNewFamily } from '../../../api/newFamilyApi';

const SectionFindNew = () => {
	const navigate = useNavigate();
	const { $isMaxWidth, $isMobile } = useResponsive();

	const { data: newFamilyData } = useQuery('getNewFamily', getNewFamily);

	const moveToNew = () => {
		navigate('/newFamily');
	};

	return (
		<FindNewSection $isMobile={$isMobile}>
			<FindNewTitleDiv $isMaxWidth={$isMaxWidth}>
				<MainSectionH2 $isMobile={$isMobile}>새로운 가족 찾기</MainSectionH2>
			</FindNewTitleDiv>
			{newFamilyData ? (
				<CardListUl>
					<FindNewList newFamilyData={newFamilyData} />
				</CardListUl>
			) : (
				<div
					style={{
						textAlign: 'center',
						height: '70px',
					}}>
					<p>입양 등록된 동물이 없습니다.</p>
				</div>
			)}
			<FindNewMoreBtnDiv $isMobile={$isMobile}>
				<SalmonBtn onClick={moveToNew} $isMobile={$isMobile}>
					더보기
				</SalmonBtn>
			</FindNewMoreBtnDiv>
		</FindNewSection>
	);
};

export default SectionFindNew;
