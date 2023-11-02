import { useMemo, useState } from 'react';

function Time() {
  const [dateTime, setDateTime] = useState(new Date());
  //Dois bugs: O primeiro é que o datepicker nao aceita quando muda de mes, ele nao atualiza, o segundao é que o onChange da hora, invalida o onChange do dia. Quando muda a hora, ele volta o dia para o dia default
  const { date, time } = useMemo(() => {
    const currentDay = `${dateTime.getFullYear()}-${
      dateTime.getMonth() + 1
    }-${dateTime.getDate().toString().padStart(2, '0')}`;

    const currentHour = dateTime.toLocaleString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit'
    });

    const defaultTime = { date: currentDay, time: currentHour };

    return defaultTime;
  }, [dateTime]);

  console.log(dateTime);

  return (
    <div>
      <input
        type='date'
        onChange={event => {
          const newDate = new Date();
          const pickedDate = event.target.value.split('-');
          newDate.setFullYear(pickedDate[0]);
          newDate.setMonth(pickedDate[1]);
          newDate.setDate(pickedDate[2]);

          setDateTime(newDate);
        }}
        value={date}
      />
      <input
        type='time'
        onChange={event => {
          const newTime = new Date();
          const pickedTime = event.target.value.split(':');
          newTime.setHours(pickedTime[0]);
          newTime.setMinutes(pickedTime[1]);

          setDateTime(newTime);
        }}
        value={time}
      />
    </div>
  );
}

export default Time;
