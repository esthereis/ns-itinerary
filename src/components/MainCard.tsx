import { useContext, useState } from "react";
import { BsArrowDownUp } from "react-icons/bs";
import styles from "./MainCard.module.css";
import buttonStyles from "./ToggleButton.module.css";
import StationAutocomplete from "./StationAutocomplete";
import ToggleButton from "./ToggleButton";
import DatePicker from "./DatePicker";
import { TripContext } from "./TripContext";
import { Context } from "../types/context";

export default function MainCard() {
  const [origin, setOrigin] = useState<string>("");
  const [destiny, setDestiny] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date>();
  const [route, setRoute] = useState<string>("departure");
  const [clicked, setClicked] = useState<boolean>(false);

  const { planJourney } = useContext(TripContext) as Context;

  return (
    <div className={`${styles.card} ${clicked && styles.transition}`}>
      <div className={styles.cardContent}>
        <StationAutocomplete placeholder="From:" onSelect={setOrigin} />
        <BsArrowDownUp className={styles.icon} />
        <StationAutocomplete placeholder="To:" onSelect={setDestiny} />

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
            setClicked(true);
            planJourney({ origin, destiny, dateTime, route });
          }}
        >
          Plan Your Trip
        </button>
      </div>
    </div>
  );
}
