import './App.css';
import { BsArrowDownUp } from 'react-icons/bs';

import Card from './components/Card';

function App() {
  return (
    <>
      <div className='container'>
        <div className='destinyContainer'>
          <div>
            <input id='fromInput' type='text' placeholder='From: ' />

            <input id='toInput' type='text' placeholder='To:' />

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
