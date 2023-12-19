import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import {
	ChangeButton,
	CloseButton,
	Contents,
	ModalForm,
	ModalInput,
	ModalWrap,
	Overlay,
	TitleDiv,
} from './AddressChangeModal.style';
import { useResponsive } from '../../../hooks/useResponsive';
import { changeAddress } from '../../../api/myPageApi';

interface AddressChangeModalProps {
	open: boolean;
	onClose: (isClosed: boolean) => void;
}

const AddressChangeModal: FC<AddressChangeModalProps> = ({ open, onClose }) => {
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const [inputValue, setInputValue] = useState({
		city: '',
		town: '',
	});

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputValue((prevInputValue) => ({
			...prevInputValue,
			[name]: value,
		}));
	};

	const addressChange = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();

		try {
			await changeAddress(inputValue);
			onClose(false);
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
	return (
		<Overlay>
			<ModalWrap
				$isMobile={$isMobile}
				$isTablet={$isTablet}
				$isPc={$isPc}
				$isMaxWidth={$isMaxWidth}>
				<Contents>
					<TitleDiv
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						주소변경
					</TitleDiv>
					<ModalForm onSubmit={addressChange}>
						<ModalInput
							name="city"
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							type="text"
							placeholder="변경할 주소를 입력해주세요."></ModalInput>
						<ModalInput
							name="town"
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							type="text"
							placeholder="상세 주소를 입력해주세요."></ModalInput>
						<ChangeButton
							type="submit"
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							주소 변경
						</ChangeButton>
						<CloseButton
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}
							onClick={() => {
								onClose(false);
							}}>
							닫기
						</CloseButton>
					</ModalForm>
				</Contents>
			</ModalWrap>
		</Overlay>
	);
};

export default AddressChangeModal;
