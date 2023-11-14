import { useEffect, useMemo, useState } from 'react';
import { func } from 'prop-types';
import '../App.css';

function DatePicker({ onDateChange }) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    onDateChange(dateTime);
  }, [dateTime, onDateChange]);

  const { date, time } = useMemo(() => {
    const [currentDay] = dateTime.toISOString().split('T');

    const currentHour = dateTime.toLocaleString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit'
    });

    const defaultTime = { date: currentDay, time: currentHour };
    return defaultTime;
  }, [dateTime]);

  function updateDate(value) {
    setDateTime(previous => {
      const [, time] = previous.toISOString().split('T');
      return new Date(`${value}T${time}`);
    });
  }

  function updateTime(value) {
    setDateTime(previous => {
      const [date] = previous.toISOString().split('T');
      return new Date(`${date},${value}`);
    });
  }

  return (
    <div className='date-pickers'>
      <input
        className='button'
        type='date'
        onChange={event => {
          updateDate(event.target.value);
        }}
        value={date}
      />
      <input
        className='button'
        type='time'
        onChange={event => {
          updateTime(event.target.value);
        }}
        value={time}
      />
    </div>
  );
}

export default DatePicker;

DatePicker.propTypes = {
  onDateChange: func
};
