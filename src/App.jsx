import { useState } from 'react';
import './App.css';
import Card from './components/Card';

import { BsArrowDownUp } from 'react-icons/bs';
import { Autocomplete } from './components/Autocomplete';

function App() {
	const [origin, setOrigin] = useState();
	const [destiny, setDestiny] = useState();

	return (
		<>
			<div className='container'>
				<div className='card'>
					<div className='search-container'>
						<Autocomplete placeholder='From:' onSelect={(value) => setOrigin(value)} />
						<Autocomplete placeholder='To:' onSelect={(value) => setDestiny(value)} />

						<BsArrowDownUp className='icon' />
					</div>

					<div className='search-container'>
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
