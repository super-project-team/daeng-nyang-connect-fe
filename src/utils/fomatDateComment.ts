const formatDateDifferenceFromString = (targetDateString: string): string => {
	const currentDate = new Date();
	const targetDate = parseDateString(targetDateString);

	if (!targetDate) {
		return '올바르지 않은 날짜 형식';
	}

	// 두 날짜 간의 차이 계산 (밀리초 단위)
	const timeDifference = currentDate.getTime() - targetDate.getTime();

	// 밀리초를 일, 시간, 분으로 변환
	const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const hoursDifference = Math.floor(
		(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
	);
	const minutesDifference = Math.floor(
		(timeDifference % (1000 * 60 * 60)) / (1000 * 60),
	);

	if (daysDifference === 0) {
		if (hoursDifference === 0) {
			if (minutesDifference === 0) {
				return '방금 전';
			} else {
				return `${minutesDifference}분 전`;
			}
		} else {
			return `${hoursDifference}시간 전`;
		}
	} else if (daysDifference === 1) {
		return '어제';
	} else if (daysDifference < 7) {
		return `${daysDifference}일 전`;
	} else {
		return `${targetDate.getFullYear()}년 ${
			targetDate.getMonth() + 1
		}월 ${targetDate.getDate()}일`;
	}
};

const parseDateString = (dateString: string): Date | null => {
	// 'yyyy년 MM월 dd일 HH시 mm분 ss초' 형식의 문자열 파싱
	const match = dateString.match(
		/(\d+)년 (\d+)월 (\d+)일 (\d+)시 (\d+)분 (\d+)초/,
	);

	if (match) {
		const [, year, month, day, hour, minute, second] = match;
		return new Date(
			Number(year),
			Number(month) - 1,
			Number(day),
			Number(hour),
			Number(minute),
			Number(second),
		);
	}

	return null;
};

export default formatDateDifferenceFromString;
