import MobileMenuBackdrop from './MobileMenuBackdrop/MobileMenuBackdrop';
import {
	CloseDiv,
	MobileDrawerDiv,
	MobileDrawerFirstLi,
	MobileDrawerH3,
	UserImgDiv,
	UserNameEm,
} from './MobileMenuDrawer.style';
import { Link } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import MobileMenuMyPage from './MobileMenuMyPage/MobileMenuMyPage';

interface MobileDrawerProps {
	setmMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuDrawer = ({ setmMenuIsOpen }: MobileDrawerProps) => {
	const token: string | null = localStorage.getItem('key');

	return (
		<MobileMenuBackdrop setmMenuIsOpen={setmMenuIsOpen}>
			<MobileDrawerDiv>
				{!token ? (
					<ul style={{ marginBottom: '50px' }}>
						<MobileDrawerH3>
							<img src="/assets/LOGO(footer).svg" alt="" />
						</MobileDrawerH3>
						<MobileDrawerFirstLi>
							<Link to="/newFamily">로그인</Link>
						</MobileDrawerFirstLi>
						<MobileDrawerFirstLi>
							<Link to="/newFamily">회원가입</Link>
						</MobileDrawerFirstLi>
					</ul>
				) : (
					<MobileMenuMyPage />
				)}
				<MobileDrawerH3>댕냥 카테고리</MobileDrawerH3>
				<ul>
					<MobileDrawerFirstLi>
						<Link to="/newFamily">새로운 가족 찾기</Link>
					</MobileDrawerFirstLi>
					<MobileDrawerFirstLi>
						<Link to="/adoptionReviews">입양 후기</Link>
					</MobileDrawerFirstLi>
					<MobileDrawerFirstLi>
						<Link to="/community">댕냥 톡톡</Link>
						<ul>
							<li>
								<Link to="/community/myPets" className="second-depth">
									나의 댕냥이
								</Link>
							</li>
							<li>
								<Link to="/community/tips" className="second-depth">
									댕냥 꿀팁
								</Link>
							</li>
							<li>
								<Link to="/community/mates" className="second-depth">
									댕냥 메이트
								</Link>
							</li>
							<li>
								<Link to="/community/losts" className="second-depth">
									댕냥 미아센터
								</Link>
							</li>
						</ul>
					</MobileDrawerFirstLi>
				</ul>
				<CloseDiv>
					<IoCloseOutline />
				</CloseDiv>
			</MobileDrawerDiv>
		</MobileMenuBackdrop>
	);
};

export default MobileMenuDrawer;
