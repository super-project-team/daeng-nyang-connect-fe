import { BackDropElem } from './BackDrop.style';

interface CommunityNavProps {
	setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const BackDrop = ({ setIsPopUp }: CommunityNavProps) => {
	const closeThePopUp = () => {
		setIsPopUp(false);
		document.body.style.overflow = 'visible';
	};

	document.body.style.overflow = 'hidden';

	return <BackDropElem onClick={closeThePopUp} />;
};

export default BackDrop;
