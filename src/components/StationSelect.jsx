import { func, string } from 'prop-types';
import { useEffect, useState } from 'react';
import { getStationInfo } from '../services/station';
import './stationSelect.css';

export function StationSelect({ placeholder, onSelect }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchable, setSearchable] = useState(false);
	const [stationList, setStationList] = useState(() => []);

	useEffect(() => {
		if (!searchable) {
			return;
		}

		getStationInfo(searchTerm).then((data) => setStationList(data));
	}, [searchTerm, searchable]);

	return (
		<div className='autocomplete'>
			<input
				className='input'
				type='text'
				placeholder={placeholder}
				onChange={(event) => {
					setSearchTerm(event.target.value);
					setSearchable(event.target.value.length >= 2);
				}}
				value={searchTerm ?? ''}
			/>

			{searchable && (
				<ul className='data-list'>
					{stationList.map((station) => (
						<li
							key={station.UICCode}
							onClick={() => {
								setSearchTerm(station.namen.lang);
								setSearchable(false);
								onSelect(station);
							}}>
							{station.namen.lang}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

StationSelect.propTypes = {
	placeholder: string.isRequired,
	onSelect: func.isRequired,
};
