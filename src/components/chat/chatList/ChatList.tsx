import ChatInfo from './ChatInfo/ChatInfo';

const ChattingList = () => {
	return (
		<ul>
			<ChatInfo className="active" />
			<ChatInfo />
			<ChatInfo />
			<ChatInfo />
		</ul>
	);
};

export default ChattingList;
