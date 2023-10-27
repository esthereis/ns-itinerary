import { string } from 'prop-types';
import { useEffect, useState } from 'react';
import { getStationInfo } from '../services/station';

function Datalist({ id, searchTerm }) {
	const [stationList, setStationList] = useState(() => []);

	useEffect(() => {
		if (!searchTerm) {
			return;
		}

		getStationInfo(searchTerm).then((data) => setStationList(data));
	}, [searchTerm]);

	return (
		<datalist id={id}>
			{stationList.map((station) => (
				<option key={station.extra.code} value={station.name} />
			))}
		</datalist>
	);
}

Datalist.propTypes = {
	id: string.isRequired,
	searchTerm: string.isRequired,
};

export default Datalist;
