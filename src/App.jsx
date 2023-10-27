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
							list='origin'
							id='fromInput'
							type='text'
							placeholder='From: '
							onChange={(event) => {
								setOrigin(event.target.value);
							}}
							value={origin ?? ''}
						/>
						<Datalist id='origin' searchTerm={origin} />

						<input
							list='destiny'
							id='toInput'
							type='text'
							placeholder='To:'
							onChange={(event) => setDestiny(event.target.value)}
							value={destiny ?? ''}
						/>
						<Datalist id='destiny' searchTerm={destiny} />

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
