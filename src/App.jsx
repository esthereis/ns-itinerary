import { useState } from 'react';
import { BsArrowDownUp } from 'react-icons/bs';
import './App.css';
import { StationSelect } from './components/StationSelect';
import Card from './components/Card';
import { DatePicker } from './components/Datepicker';

function App() {
	const [origin, setOrigin] = useState();
	const [destiny, setDestiny] = useState();
	const [dateTime, setDateTime] = useState();

	return (
		<div className='container'>
			<div className='card'>
				<div className='search-container'>
					<StationSelect placeholder='From:' onSelect={(value) => setOrigin(value)} />
					<StationSelect placeholder='To:' onSelect={(value) => setDestiny(value)} />

					<BsArrowDownUp className='icon' />
				</div>

				<DatePicker onDateChange={setDateTime} />
			</div>

			<Card />
		</div>
	);
}

export default App;
