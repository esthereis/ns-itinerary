import Proptypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getTrainInformation } from '../services/trainStopsApi';

function Datalist(props) {
  const [stationList, setStationList] = useState(() => []);

  useEffect(() => {
    if (!props.searchTerm) {
      return;
    }
    getTrainInformation(props.searchTerm).then(data => setStationList(data));
  }, [props.searchTerm]);

  const handleSelect = code => {
    console.log('test');
    props.onSelectedCode(code);
  };

  return (
    <datalist id={props.id}>
      {stationList?.map(station => (
        <option
          key={station.UICCode}
          value={station.namen.lang}
          onClick={() => handleSelect(station.UICCode)}
        />
      ))}
    </datalist>
  );
}

Datalist.propTypes = {
  searchTerm: Proptypes.string.isRequired,
  id: Proptypes.string,
  onSelectedCode: Proptypes.func
};

export default Datalist;
