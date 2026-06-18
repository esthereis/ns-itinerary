import AutoComplete from "./AutoComplete";
import Button from "./Button";
import CustomDatePicker from "./CustomDatePicker";
import Input from "./Input";
import InputPrefix from "./InputPrefix";
import styles from "./ItineraryCard.module.css";
import { FaExchangeAlt } from "react-icons/fa";

type ItineraryCardProps = {
  departureList: string[];
  arrivalList: string[];
};

export default function ItineraryCard({
  departureList,
  arrivalList,
}: ItineraryCardProps) {
  return (
    <div className={styles["card-wrapper"]}>
      <div className={styles["itinerary-buttons"]}>
        <AutoComplete
          items={departureList}
          label="Departure"
          placeholder="Ex: Amsterdam"
          prefixElement={<InputPrefix />}
          width="280px"
        />

        <Button width="50px" height="50px">
          {<FaExchangeAlt />}
        </Button>

        <AutoComplete
          items={arrivalList}
          label="Arrival"
          placeholder="Ex: Rotterdam"
          prefixElement={<InputPrefix />}
          width="280px"
        />
      </div>

      <CustomDatePicker label="Departure Date" width="280px" />
      <CustomDatePicker label="Departure Time" type="time" width="280px" />

      <Button width="180px">Plan your trip</Button>
    </div>
  );
}
