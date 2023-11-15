import { array, string, func } from 'prop-types';
import './buttonGroup.css';

function ButtonGroup({ options, value, onSelect }) {
  return (
    <div className='button-group'>
      {options.map(option => (
        <button
          type='button'
          key={option.value}
          className={`button ${
            value === option.value ? 'selected' : undefined
          }`}
          onClick={() => onSelect(option.value)}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}

export default ButtonGroup;

ButtonGroup.propTypes = {
  options: array.isRequired,
  value: string.isRequired,
  onSelect: func.isRequired
};
