import './App.css';
import { useCallback, useState } from 'react';
import { getTripData } from './services/travel';

import TripCard from './components/TripCard';
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

  function getItinerary(itinerary, path) {
    console.log(itinerary.legs);
    if (path === 'departure') {
      const [, time] = itinerary.legs[0].origin.plannedDateTime.split('T');
      return time;
    }

    if (path === 'arrival') {
      const length = itinerary.legs.length;

      const [, time] =
        itinerary.legs[length - 1].destination.plannedDateTime.split('T');
      return time;
    }
  }

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
    <div className='page'>
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
      </div>

      {trip?.map(itinerary => (
        <TripCard
          key={itinerary.checksum}
          departure={getItinerary(itinerary, 'departure')}
          arrival={getItinerary(itinerary, 'arrival')}
        />
      ))}

      <TripCard />
    </div>
  );
}

export default App;
