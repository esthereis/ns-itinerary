import Proptypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getTrainInformation } from '../services/trainStopsApi';

function Datalist(props) {
  const [stationList, setStationList] = useState([]);

  console.log(stationList);

  useEffect(() => {
    if (!props.searchTerm) {
      return;
    }
    getTrainInformation(props.searchTerm).then(data => setStationList(data));
  }),
    [props.searchTerm];

  return (
    <datalist id={props.id}>
      {stationList.map(station => (
        <option key={station.extra.code} value={station.name} />
      ))}
    </datalist>
  );
}

Datalist.propTypes = {
  searchTerm: Proptypes.string.isRequired,
  id: Proptypes.string
};

export default Datalist;
