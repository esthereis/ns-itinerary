import { func } from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

export function DatePicker({ onDateChange }) {
	const [dateTime, setDateTime] = useState(new Date());

	const { date, time } = useMemo(() => {
		const [currentDate] = dateTime.toISOString().split('T');

		const currentTime = dateTime.toLocaleString(navigator.language, {
			hour: '2-digit',
			minute: '2-digit',
		});

		const defaultTime = { date: currentDate, time: currentTime };

		return defaultTime;
	}, [dateTime]);

	function selectDate(value) {
		setDateTime((previous) => {
			const [, time] = previous.toISOString().split('T');

			return new Date(`${value}T${time}`);
		});
	}

	function selectTime(value) {
		setDateTime((previous) => {
			const [date] = previous.toISOString().split('T');

			return new Date(`${date}T${value}`);
		});
	}

	useEffect(() => {
		onDateChange(dateTime);
	}, [dateTime, onDateChange]);

	return (
		<div className='search-container'>
			<input className='input' type='date' onChange={(event) => selectDate(event.target.value)} value={date} />
			<input className='input' type='time' onChange={(event) => selectTime(event.target.value)} value={time} />
		</div>
	);
}

DatePicker.propTypes = {
	onDateChange: func.isRequired,
};
