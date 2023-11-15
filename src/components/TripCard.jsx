import { string } from 'prop-types';
import './tripCard.css';

function TripCard({ departure, arrival }) {
  return (
    <div className='itinerary-container'>
      <div className='trip-card'>
        <span>{departure}</span>
        <span>{arrival}</span>

        <span></span>
      </div>
    </div>
  );
}

export default TripCard;

TripCard.propTypes = {
  departure: string,
  arrival: string
};
