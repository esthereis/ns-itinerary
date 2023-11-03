import { useCallback, useState } from 'react';
import { BsArrowDownUp } from 'react-icons/bs';
import './App.css';
import { StationSelect } from './components/StationSelect';
import Card from './components/Card';
import { DatePicker } from './components/Datepicker';
import { ButtonGroup } from './components/ButtonGroup';
import { getTripData } from './services/travel';

function App() {
	const [origin, setOrigin] = useState();
	const [destiny, setDestiny] = useState();
	const [dateTime, setDateTime] = useState();
	const [route, setRoute] = useState('departure');
	const [trip, setTrip] = useState();

	const planJourney = useCallback(async () => {
		const data = await getTripData({
			origin,
			destiny,
			dateTime,
			route,
		});

		setTrip(data);
	}, [origin, destiny, dateTime, route]);

	console.log(trip);

	return (
		<div className='container'>
			<div className='card'>
				<div className='search-container'>
					<StationSelect placeholder='From:' onSelect={(value) => setOrigin(value)} />
					<StationSelect placeholder='To:' onSelect={(value) => setDestiny(value)} />

					<BsArrowDownUp className='icon' />
				</div>

				<ButtonGroup
					value={route}
					options={[
						{ name: 'Departure', value: 'departure' },
						{
							name: 'Arrival',
							value: 'arrival',
						},
					]}
					onSelect={(value) => setRoute(value)}
				/>

				<DatePicker onDateChange={setDateTime} />

				<button className='button' onClick={() => planJourney()}>
					Plan your journey
				</button>
			</div>

			<Card />
		</div>
	);
}

export default App;
