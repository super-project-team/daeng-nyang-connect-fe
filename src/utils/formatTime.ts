const formatTime = (time: string | undefined) => {
	if (!time) return '';

	const [hours, minutes] = time.split(':').map(Number);
	const period = hours < 12 ? '오전' : '오후';
	const formattedHours = hours % 12 || 12;

	return `${period} ${formattedHours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')} `;
};

export default formatTime;
