import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import Datalist from './components/Datalist';

import { BsArrowDownUp } from 'react-icons/bs';

function App() {
  const [origin, setOrigin] = useState('');
  const [destiny, setDestiny] = useState('');

  return (
    <>
      <div className='container'>
        <div className='destinyContainer'>
          <div>
            <input
              list='originList'
              id='fromInput'
              type='text'
              placeholder='From: '
              onChange={event => {
                setOrigin(event.target.value);
              }}
              value={origin ?? ''}
            />
            <Datalist searchTerm={origin} id={'originList'} />

            <input
              list='destinyList'
              id='toInput'
              type='text'
              placeholder='To:'
              onChange={event => setDestiny(event.target.value)}
              value={destiny ?? ''}
            />
            <Datalist searchTerm={destiny} id={'destinyList'} />

            <BsArrowDownUp />
          </div>

          <div>
            <label htmlFor='timeInput'>Departure Time:</label>
            <input id='timeInput' type='time' />
          </div>
        </div>

        <Card />
      </div>
    </>
  );
}

export default App;
