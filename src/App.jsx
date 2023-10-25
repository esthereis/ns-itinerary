import './App.css';
import Card from './components/Card';
import nsApi from './api/nsApi';

import { BsArrowDownUp } from 'react-icons/bs';

//create state to handle the data

function App() {
  async function getData() {
    try {
      const response = await nsApi.get();

      // if (!response.ok) {
      //   throw new Error('API Request Error!');
      // } //por algum motivo nao funciona

      if (response.status !== 200) {
        throw new Error('API Request Error!');
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

  getData();

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
