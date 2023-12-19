import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import {
	DeleteYourAccountDiv,
	GenderDiv,
	ModalDiv,
	ProductRegisterButton,
	ProfileImg,
	ProfileImgDiv,
	ProfileImgInput,
	ProfileImgLabel,
	SignOutDiv,
	UserBox,
	UserContent,
	UserItemContentDiv,
	UserItemDiv,
	UserItemTitleDiv,
	UserLeftItemDiv,
	UserLeftItemDivEmail,
	UserLeftItemDivWrapper,
	UserNameDiv,
	UserNamePhotoDiv,
	UserPhotoDiv,
	UserRightItemDiv,
	UserWrapper,
} from './User.style';
import { useNavigate } from 'react-router';
import TelChangeModal from '../TelChangeModal/TelChangeModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import AddressChangeModal from '../AddressChangeModal/AddressChangeModal';
import localToken from '../../../api/LocalToken';
import { logoutUser, myPageGet } from '../../../api/authApi';
import { useDispatch } from 'react-redux';
import { LOGOUT_USER } from '../../../slice/userSlice';
import { useResponsive } from '../../../hooks/useResponsive';
import InfoChangeModal from '../InfoChangeModal/InfoChangeModal';
import NicknameChangeModal from '../NicknameChangeModal/NicknameChangeModal';
import PasswordChangeModal from '../PasswordChangeModal/PasswordChangeModal';

const User = () => {
	interface AddressChangeModalProps {
		open: boolean;
		onClose: () => void;
	}

	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const [imgFile, setImgFile] = useState('');
	const imgRef = useRef<HTMLInputElement>();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [infoIsOpen, infoSetIsOpen] = useState(false);
	const [deleteIsOpen, deleteSetIsOpen] = useState(false);
	const [nicknameIsOpen, nicknameSetIsOpen] = useState(false);
	const [addressIsOpen, addressSetIsOpen] = useState(false);
	const [telIsOpen, telSetIsOpen] = useState(false);
	const [passwordIsOpen, passwordSetIsOpen] = useState(false);

	const [userInfo, setUserInfo] = useState({
		name: '',
		email: '',
		mobile: '',
		nickname: '',
		city: '',
		town: '',
		info: '',
		img: null,
		gender: '',
		experience: null,
	});

	const getMyInfo = async () => {
		try {
			const response = await myPageGet();
			console.log(response);
			if (response) {
				// API 응답에서 필요한 정보를 추출하여 state 업데이트
				setUserInfo({
					name: response.name || '',
					email: response.email || '',
					mobile: response.mobile || '',
					nickname: response.nickname || '',
					city: response.city || '',
					town: response.town || '',
					info: response.info || '',
					img: response.img || '',
					gender: response.gender || '',
					experience: response.experience || null,
				});
			}
		} catch (error) {
			if (error instanceof TypeError) {
				// TypeError
			} else if (error instanceof SyntaxError) {
				// SyntaxError
			} else if (typeof error === 'string') {
				// string
			} else {
				// other
			}
		}
	};

	useEffect(() => {
		getMyInfo(); // 컴포넌트가 마운트되면 사용자 정보 가져오기
	}, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

	const passwordOnClickButton = () => {
		passwordSetIsOpen(true);
	};

	const nicknameOnClickButton = () => {
		nicknameSetIsOpen(true);
	};

	const telOnClickButton = () => {
		telSetIsOpen(true);
	};

	const infoOnClickButton = () => {
		infoSetIsOpen(true);
	};

	const deleteOnClickButton = () => {
		deleteSetIsOpen(true);
	};

	const addressOnClickButton = () => {
		addressSetIsOpen(true);
	};

	const logoutHandler = async () => {
		try {
			await logoutUser();
			dispatch(LOGOUT_USER());
			localToken.remove();
			navigate('/');
		} catch (error) {
			if (error instanceof TypeError) {
				// TypeError
			} else if (error instanceof SyntaxError) {
				// SyntaxError
			} else if (typeof error === 'string') {
				// string
			} else {
				// other
			}
		}
	};

	// const saveImgFile = async () => {
	// 	try {
	// 		const selectedFile = imgRef.current?.files?.[0];
	// 		if (!selectedFile) {
	// 			console.log('파일이 선택되지 않았습니다.');
	// 			return; // 파일이 선택되지 않은 경우 함수 종료
	// 		}

	// 		if (!(selectedFile instanceof Blob)) {
	// 			console.error('선택된 파일이 유효한 파일 또는 Blob 객체가 아닙니다.');
	// 			return; // 유효하지 않은 파일인 경우 함수 종료
	// 		}
	// 		const formData = new FormData();
	// 		formData.append('file', selectedFile);
	// 		const response = await uploadUser(formData);
	// 		console.log('이미지 업로드 후 반환되는 URl값:', response);

	// 		setUserInfo((prevUserInfo) => ({
	// 			...prevUserInfo,
	// 			profileImg: response,
	// 		}));

	// 		console.log('유저 스테이트에 이미지 url 업로드 되는지 체크:', userInfo);
	// 		const putResponse = await putMyInfo(userInfo);
	// 		if (!response) return;

	// 		const reader = new FileReader();
	// 		reader.readAsDataURL(selectedFile);
	// 		reader.onloadend = () => {
	// 			setImgFile(reader.result);
	// 		};
	// 	} catch (error) {
	// 		console.error('이미지 업로드 중 오류 발생:', error.message);
	// 	}
	// };

	return (
		<UserWrapper>
			<UserBox>
				<UserContent>
					<UserItemDiv>
						<UserNamePhotoDiv>
							<UserPhotoDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								<ProfileImgDiv>
									<ProfileImg
										src={userInfo.img || '/assets/icons/icon-user.png'}
										onClick={() => {
											imgRef.current?.click();
										}}
									/>
									<ProfileImgInput
										className="signup-profileImg-input"
										type="file"
										accept="image/jpg,image/png,image/jpeg"
										id="profileImg"
										// onChange={saveImgFile}
										ref={imgRef as React.RefObject<HTMLInputElement>}
									/>
								</ProfileImgDiv>
							</UserPhotoDiv>
							<UserNameDiv>{userInfo.name}</UserNameDiv>
						</UserNamePhotoDiv>
						<UserLeftItemDivWrapper
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							<UserItemTitleDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								이메일
							</UserItemTitleDiv>
							<UserLeftItemDivEmail
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								{userInfo.email}
							</UserLeftItemDivEmail>
							<div></div>
						</UserLeftItemDivWrapper>
						<UserLeftItemDivWrapper
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							<UserItemTitleDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								닉네임
							</UserItemTitleDiv>
							<UserLeftItemDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								{userInfo.nickname}
							</UserLeftItemDiv>
							<ModalDiv
								onClick={nicknameOnClickButton}
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								변경
							</ModalDiv>
							{nicknameIsOpen && (
								<NicknameChangeModal
									open={nicknameIsOpen}
									onClose={() => {
										nicknameSetIsOpen(false);
									}}
								/>
							)}
						</UserLeftItemDivWrapper>

						<UserLeftItemDivWrapper
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							<UserItemTitleDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								소개글
							</UserItemTitleDiv>
							<UserLeftItemDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								{userInfo.info ? userInfo.info : <p>소개글을 입력해 주세요.</p>}
							</UserLeftItemDiv>
							<ModalDiv
								onClick={infoOnClickButton}
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								변경
							</ModalDiv>
							{infoIsOpen && (
								<InfoChangeModal
									open={infoIsOpen}
									onClose={() => {
										infoSetIsOpen(false);
									}}
								/>
							)}
						</UserLeftItemDivWrapper>
						<UserLeftItemDivWrapper
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							<UserItemTitleDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								주소
							</UserItemTitleDiv>
							<UserLeftItemDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								{userInfo.city}
								{userInfo.town}
							</UserLeftItemDiv>
							<ModalDiv
								onClick={addressOnClickButton}
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								변경
							</ModalDiv>
							{addressIsOpen && (
								<AddressChangeModal
									open={addressIsOpen}
									onClose={() => {
										addressSetIsOpen(false);
									}}
								/>
							)}
						</UserLeftItemDivWrapper>
						<UserLeftItemDivWrapper
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							<UserItemTitleDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								전화번호
							</UserItemTitleDiv>
							<UserLeftItemDiv
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								{userInfo.mobile}
							</UserLeftItemDiv>
							<ModalDiv
								onClick={telOnClickButton}
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								변경
							</ModalDiv>
							{telIsOpen && (
								<TelChangeModal
									open={telIsOpen}
									onClose={() => {
										telSetIsOpen(false);
									}}
								/>
							)}
						</UserLeftItemDivWrapper>
					</UserItemDiv>
				</UserContent>
				<UserContent>
					<SignOutDiv
						onClick={logoutHandler}
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						로그아웃
					</SignOutDiv>
					<SignOutDiv
						onClick={passwordOnClickButton}
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						비밀번호 변경
					</SignOutDiv>
					{passwordIsOpen && (
						<PasswordChangeModal
							open={infoIsOpen}
							onClose={() => {
								passwordSetIsOpen(false);
							}}
						/>
					)}
					<SignOutDiv
						onClick={deleteOnClickButton}
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						계정삭제
					</SignOutDiv>
					{deleteIsOpen && (
						<DeleteModal
							open={deleteIsOpen}
							onClose={() => {
								deleteSetIsOpen(false);
							}}
						/>
					)}
				</UserContent>
			</UserBox>
		</UserWrapper>
	);
};

export default User;
