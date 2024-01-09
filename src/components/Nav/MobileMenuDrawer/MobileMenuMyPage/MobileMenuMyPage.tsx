import { Link } from 'react-router-dom';
import {
	MobileDrawerFirstLi,
	MobileDrawerH3,
	UserImgDiv,
	UserNameEm,
} from '../MobileMenuDrawer.style';
import { useSelector } from 'react-redux';
import { UserState } from '../../../../slice/userSlice';

const MobileMenuMyPage = () => {
	const user = useSelector((state: any) => state.user);
	return (
		<>
			<ul>
				<MobileDrawerFirstLi>
					<MobileDrawerH3>
						<img src="/assets/LOGO(footer).svg" alt="" />
					</MobileDrawerH3>
				</MobileDrawerFirstLi>
			</ul>
			<Link to={`users/${user.id}`}>
				<MobileDrawerH3 margin="30px">마이페이지</MobileDrawerH3>
			</Link>
		</>
	);
};

export default MobileMenuMyPage;
