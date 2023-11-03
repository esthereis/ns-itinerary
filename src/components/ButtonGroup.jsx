import { func, string } from 'prop-types';
import { array } from 'prop-types';
import classNames from 'classnames';
import './buttonGroup.css';

export function ButtonGroup({ value, options, onSelect }) {
	return (
		<div className='button-group'>
			{options.map((option) => (
				<button
					type='button'
					key={option.value}
					className={classNames('button', value === option.value ? 'selected' : undefined)}
					onClick={() => onSelect(option.value)}>
					{option.name}
				</button>
			))}
		</div>
	);
}

ButtonGroup.propTypes = {
	value: string.isRequired,
	options: array.isRequired,
	onSelect: func.isRequired,
};
