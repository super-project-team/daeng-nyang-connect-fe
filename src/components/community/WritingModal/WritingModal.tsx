import { useResponsive } from '../../../hooks/useResponsive';
import { WritingModalSection } from './WritingModal.style';
import WritingModalForm from './WritingModalForm/WritingModalForm';

interface CommunityNavProps {
	setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const WritingModal = ({ setIsPopUp }: CommunityNavProps) => {
	const { $isMobile } = useResponsive();

	return (
		<WritingModalSection $isMobile={$isMobile}>
			<WritingModalForm setIsPopUp={setIsPopUp} />
		</WritingModalSection>
	);
};

export default WritingModal;
