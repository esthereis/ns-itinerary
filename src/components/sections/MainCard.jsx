import styles from "../../styles/Card.module.css";
import Input from "../Input";
import DatePicker from "./DatePicker";
import ToggleButton from "../ToggleButton";
import TripCard from "../common/TripCard";
import buttonStyles from "../../styles/ToggleButton.module.css";
import { useCallback, useState } from "react";
import { getTripData } from "../../services/travel";
import { BsArrowDownUp } from "react-icons/bs";

export default function MainCard() {
  const [origin, setOrigin] = useState(() => "");
  const [destiny, setDestiny] = useState(() => "");
  const [dateTime, setDateTime] = useState(() => undefined);
  const [route, setRoute] = useState(() => "departure");
  // const [trip, setTrip] = useState(() => undefined);

  const planJourney = useCallback(async () => {
    const date = dateTime.toISOString();
    const response = await getTripData({
      origin,
      destiny,
      date,
      route,
    });
    setTrip(response);
  }, [origin, destiny, dateTime, route]);

  return (
    <>
      <div className={styles.card}>
        <div>
          <Input
            placeholder="From:"
            onSelect={(station) => setOrigin(station)}
          />

          <BsArrowDownUp className={styles.icon} />
          <Input
            placeholder="To:"
            onSelect={(station) => setDestiny(station)}
          />
        </div>

        <ToggleButton
          value={route}
          options={[
            { name: "Departure", value: "departure" },
            { name: "Arrival", value: "arrival" },
          ]}
          onSelect={(option) => {
            setRoute(option);
          }}
        />

        <DatePicker
          onDateChange={(date) => {
            setDateTime(date);
          }}
        />

        <button
          type="button"
          className={buttonStyles.button}
          onClick={() => {
            planJourney();
          }}
        >
          Plan Your Trip
        </button>
      </div>

      {/* <div className="itinerary-container">
        {trip?.map((itinerary) => (
          <TripCard key={itinerary.checksum} path={itinerary} />
        ))}
      </div> */}
    </>
  );
}
