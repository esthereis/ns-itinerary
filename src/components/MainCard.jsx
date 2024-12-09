import { useContext, useState } from "react";
import { BsArrowDownUp } from "react-icons/bs";
import styles from "./MainCard.module.css";
import buttonStyles from "./ToggleButton.module.css";
import Input from "./Input";
import ToggleButton from "./ToggleButton";
import DatePicker from "./DatePicker";
import { TripContext } from "./TripContext";

export default function MainCard() {
  const [origin, setOrigin] = useState("");
  const [destiny, setDestiny] = useState("");
  const [dateTime, setDateTime] = useState(undefined);
  const [route, setRoute] = useState("departure");
  const [clicked, setClicked] = useState(false);

  const { planJourney } = useContext(TripContext);

  return (
    <div className={`${styles.card} ${clicked && styles.transition}`}>
      <div className={styles.cardContent}>
        <Input placeholder="From:" onSelect={setOrigin} />
        <BsArrowDownUp className={styles.icon} />
        <Input placeholder="To:" onSelect={setDestiny} />

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
