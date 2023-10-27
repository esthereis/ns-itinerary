import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import nsApi from './api/nsApi';
import Datalist from './components/Datalist';

import { BsArrowDownUp } from 'react-icons/bs';

function App() {
  // const [apiResponse, setApiResponse] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destiny, setDestiny] = useState('');

  async function getData() {
    try {
      const response = await nsApi.get();
      // // setApiResponse(response);

      // const uniqueStationCodes = Object.keys(response.data).reduce(
      //   (acc, cur) => {
      //     const station = response.data[cur];
      //     Object.keys(station).forEach(stationCode => {
      //       if (!acc.includes(station[stationCode].stationCode)) {
      //         acc.push(station[stationCode].stationCode);
      //       }
      //     });
      //     return acc;
      //   },
      //   []
      // );

      if (response.status !== 200) {
        throw new Error('API Request Error!');
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

  getData();

  function filterStation() {}

  return (
    <>
      <div className='container'>
        <div className='destinyContainer'>
          <div>
            <input
              list='dataList'
              id='fromInput'
              type='text'
              placeholder='From: '
              onChange={event => {
                setOrigin(event.target.value);
              }}
              value={origin ?? ''}
            />

            <input
              list='dataList'
              id='toInput'
              type='text'
              placeholder='To:'
              onChange={event => setDestiny(event.target.value)}
              value={destiny ?? ''}
            />
            <Datalist />

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
