import { useEffect, useState } from 'react';
import ChatInfo from './ChatInfo/ChatInfo';
import { useQuery } from 'react-query';
import { getChatLists } from '../../../api/chatApi';

const ChattingList = ({ chatLists, setSelectedRoomId }: any) => {
	const [selectedChatIndex, setSelectedChatIndex] = useState(0);

	const clickListHandler = (index: number) => {
		setSelectedChatIndex(index);
	};

	const clickListChatRoomHandler = (roomId: number) => {
		setSelectedRoomId(roomId);
	};
	return (
		<ul>
			{chatLists && chatLists.length > 0
				? chatLists.map((chatinfo: any, index: number) => (
						<ChatInfo
							key={index}
							chatinfo={chatinfo}
							isSelected={selectedChatIndex === index}
							click={() => clickListHandler(index)}
							chatClick={clickListChatRoomHandler}
						/>
				  ))
				: null}
		</ul>
	);
};

export default ChattingList;
