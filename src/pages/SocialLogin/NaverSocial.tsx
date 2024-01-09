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
	useEffect(() => {
		if (document.cookie.includes('access')) {
			const cookie = document.cookie;
			const accessTokenMatch = cookie.match(/access_token=([^;]*)/);
			const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;

			const refreshTokenMatch = cookie.match(/refresh_token=([^;]*)/);
			const refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;
			if (accessToken) localStorage.setItem('access_token', accessToken);
			if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
		}
	}, []);

	const loginCancelHandler = () => {
		localToken.remove();
		navigate('/login');
	};
	const loginCompeteHandler = async () => {
		const token = localToken.get();
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
				<LoginButton className="social" onClick={loginCompeteHandler}>
					로그인 완료
				</LoginButton>
			</LoginDiv>
		</LoginWrapper>
	);
};

export default NaverSocial;
