import React from 'react';
import { LoginButton, LoginDiv, LoginWrapper } from '../Login/Login.style';
import localToken from '../../api/LocalToken';
import { oauthLoginCheck } from '../../api/authApi';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { LOGIN_USER } from '../../slice/userSlice';

const Social = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loginCancelHandler = () => {
		localToken.remove();
		navigate('/login');
	};
	const loginCompeteHandler = async () => {
		const token = localToken.get();
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
	};
	return (
		<LoginWrapper>
			<LoginDiv>
				<LoginButton onClick={loginCancelHandler}>로그인 취소</LoginButton>
				<LoginButton onClick={loginCompeteHandler}>로그인 완료</LoginButton>
			</LoginDiv>
		</LoginWrapper>
	);
};

export default Social;
