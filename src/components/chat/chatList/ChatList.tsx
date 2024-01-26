import { useEffect, useState } from 'react';
import ChatInfo from './ChatInfo/ChatInfo';

const ChattingList = ({ chatLists, chatRefetch }: any) => {
	const [selectedChatIndex, setSelectedChatIndex] = useState(0);

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
							isSelected={selectedChatIndex === index}
							click={() => clickListHandler(index)}
						/>
					))
				: null}
		</ul>
	);
};

export default ChattingList;
