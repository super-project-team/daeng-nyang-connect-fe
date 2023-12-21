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
	const user = useSelector((state: UserState) => state);
	return (
		<>
			<ul
				style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
				<MobileDrawerFirstLi>
					<UserImgDiv>
						<img src="/assets/community2.jpg" alt="" />
					</UserImgDiv>
				</MobileDrawerFirstLi>
				<MobileDrawerFirstLi style={{ marginBottom: '8px' }}>
					<p>{user.nickname}</p>
				</MobileDrawerFirstLi>
			</ul>
			<Link to={`users/${user.id}`}>
				<MobileDrawerH3 margin="30px">마이페이지</MobileDrawerH3>
			</Link>
		</>
	);
};

export default MobileMenuMyPage;
