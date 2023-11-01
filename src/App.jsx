import './App.css';
import { useState } from 'react';

import Card from './components/Card';
import { BsArrowDownUp } from 'react-icons/bs';
import Autocomplete from './components/Autocomplete';
import Time from './components/Time';

function App() {
  const [origin, setOrigin] = useState('');
  const [destiny, setDestiny] = useState('');

  console.log(origin, destiny);

  return (
    <>
      <div className='container'>
        <div className='card'>
          <div className='search-container'>
            <Autocomplete
              placeholder='From:'
              onSelect={station => setOrigin(station)}
            />

            <Autocomplete
              placeholder='To:'
              onSelect={station => setDestiny(station)}
            />

            <BsArrowDownUp className='icon' />
          </div>

          <Time />
        </div>

        <Card />
      </div>
    </>
  );
}

export default App;
