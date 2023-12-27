import { ReactNode } from 'react';
import { MobileMenuBackdropDiv } from './MobileMenuBackdrop.style';

interface BackdropProps {
	children: ReactNode;
	setmMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuBackdrop = ({ children, setmMenuIsOpen }: BackdropProps) => {
	const backdropHandler = () => {
		setmMenuIsOpen((prev) => !prev);
	};
	return (
		<MobileMenuBackdropDiv onClick={backdropHandler}>
			{children}
		</MobileMenuBackdropDiv>
	);
};

export default MobileMenuBackdrop;
