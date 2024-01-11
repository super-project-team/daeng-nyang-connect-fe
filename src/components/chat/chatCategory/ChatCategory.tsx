import { IoChatbubbleOutline } from 'react-icons/io5';
import { ChatCategoryLi, ChatCategoryUl } from './ChatCategory.style';
import { useResponsive } from '../../../hooks/useResponsive';
const ChatCategory = () => {
	const { $isMobile } = useResponsive();
	const icon = $isMobile ? 'icon-chat icons' : 'icons';
	return (
		<ChatCategoryUl $isMobile={$isMobile}>
			<ChatCategoryLi className="isActive" $isMobile={$isMobile}>
				<img className="icons" src="/assets/foundation_paw.svg" alt="발바닥" />
			</ChatCategoryLi>
			<ChatCategoryLi>
				<IoChatbubbleOutline className={icon} />
			</ChatCategoryLi>
		</ChatCategoryUl>
	);
};

export default ChatCategory;
