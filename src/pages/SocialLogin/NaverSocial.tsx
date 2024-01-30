import React, { useEffect } from 'react';
import { LoginButton, LoginDiv, LoginWrapper } from '../Login/Login.style';
import localToken from '../../api/LocalToken';
import { oauthLoginCheck } from '../../api/authApi';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { LOGIN_USER } from '../../slice/userSlice';

const NaverSocial = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loginCancelHandler = () => {
		localToken.remove();
		navigate('/login');
	};
	const loginCompleteHandler = async () => {
		const token = localToken.get();
		console.log('로컬스토리지 토큰 : ', token);
		console.log('쿠키 :', document.cookie);
		try {
			if (token) {
				const response = await oauthLoginCheck(token);

				if (response) {
					const { nickname, id } = response;
					dispatch(
						LOGIN_USER({
							isLoggedIn: true,
							nickname: nickname,
							id: id,
						}),
					);
					navigate('/');
				}
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<LoginWrapper>
			<LoginDiv>
				<LoginButton className="social cancel" onClick={loginCancelHandler}>
					로그인 취소
				</LoginButton>
				<LoginButton className="social" onClick={loginCompleteHandler}>
					로그인 완료
				</LoginButton>
			</LoginDiv>
		</LoginWrapper>
	);
};

export default NaverSocial;
