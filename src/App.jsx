import './App.css';
import { useCallback, useState } from 'react';
import { getTripData } from './services/travel';

import Card from './components/Card';
import { BsArrowDownUp } from 'react-icons/bs';
import StationSelection from './components/StationSelection';
import DatePicker from './components/DatePicker';
import ButtonGroup from './components/ButtonGroup';

function App() {
  const [origin, setOrigin] = useState(() => '');
  const [destiny, setDestiny] = useState(() => '');
  const [dateTime, setDateTime] = useState(() => undefined);
  const [route, setRoute] = useState(() => 'departure');
  const [trip, setTrip] = useState(() => undefined);

  console.log(trip);

  const planJourney = useCallback(async () => {
    const date = dateTime.toISOString();
    const response = await getTripData({
      origin,
      destiny,
      date,
      route
    });
    setTrip(response);
  }, [origin, destiny, dateTime, route]);

  return (
    <>
      <div className='container'>
        <div className='card'>
          <div className='search-container'>
            <StationSelection
              placeholder='From:'
              onSelect={station => setOrigin(station)}
            />

            <StationSelection
              placeholder='To:'
              onSelect={station => setDestiny(station)}
            />

            <BsArrowDownUp className='icon' />
          </div>

          <ButtonGroup
            value={route}
            options={[
              { name: 'Departure', value: 'departure' },
              { name: 'Arrival', value: 'arrival' }
            ]}
            onSelect={option => {
              setRoute(option);
            }}
          />

          <DatePicker
            onDateChange={date => {
              setDateTime(date);
            }}
          />

          <button
            type='button'
            className='button'
            onClick={() => {
              planJourney();
            }}
          >
            Plan Your Trip
          </button>
        </div>

        <Card />
      </div>
    </>
  );
}

export default App;
