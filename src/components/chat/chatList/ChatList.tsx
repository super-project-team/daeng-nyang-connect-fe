import { useEffect, useState } from 'react';
import ChatInfo from './ChatInfo/ChatInfo';
import { useParams } from 'react-router-dom';

const ChattingList = ({ chatLists, chatRefetch }: any) => {
	const { roomId } = useParams();
	const [selectedChatIndex, setSelectedChatIndex] = useState<
		number | string | null
	>(Number(roomId));

	const clickListHandler = (index: number) => {
		setSelectedChatIndex(index);
	};

	useEffect(() => {
		chatRefetch();
	}, [chatLists]);

	return (
		<ul>
			{chatLists && chatLists.length > 0
				? chatLists.map((chatinfo: any, index: number) => (
						<ChatInfo
							key={index}
							chatinfo={chatinfo}
							isSelected={selectedChatIndex == chatinfo.chatRoomId}
							click={clickListHandler}
						/>
					))
				: null}
		</ul>
	);
};

export default ChattingList;
