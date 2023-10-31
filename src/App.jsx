import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Datalist from './components/Datalist';
import { getTripData } from './services/tripsApi';

import { BsArrowDownUp } from 'react-icons/bs';

function App() {
  const [origin, setOrigin] = useState('');
  const [destiny, setDestiny] = useState('');
  const [code, setCode] = useState({ originCode: '', destinyCode: '' });

  // useEffect(() => {
  //   if (!code) {
  //     console.log('Could not recieve data');
  //     return;
  //   }
  //   getTripData(code.originCode, code.destinyCode).then(response =>
  //     console.log(response)
  //   );
  // }, [code]);

  // console.log(code);

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
            <Datalist
              searchTerm={origin}
              id={'originList'}
              onSelectedCode={code =>
                setCode({ originCode: code, destinyCode: '' })
              }
            />

            <input
              list='destinyList'
              id='toInput'
              type='text'
              placeholder='To:'
              onChange={event => setDestiny(event.target.value)}
              value={destiny ?? ''}
            />
            <Datalist
              searchTerm={destiny}
              id={'destinyList'}
              onSelectedCode={code =>
                setCode({ originCode: '', destinyCode: code })
              }
            />

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
