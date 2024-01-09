import { useEffect } from 'react';
import ChatInfo from './ChatInfo/ChatInfo';
import { useQuery } from 'react-query';
import { getChatLists } from '../../../api/chatApi';

const ChattingList = ({ chatLists }: any) => {
	return (
		<ul>
			{chatLists && chatLists.length > 0
				? chatLists.map((chatinfo: any, index: number) => (
						<ChatInfo key={index} chatinfo={chatinfo} />
				  ))
				: null}
		</ul>
	);
};

export default ChattingList;
