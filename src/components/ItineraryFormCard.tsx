import { ImCalendar, ImClock } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import styles from "./ItineraryFormCard.module.css";
import AutoComplete from "./ui/AutoComplete";
import CustomDatePicker from "./ui/CustomDatePicker";

export default function ItineraryFormCard() {
  return (
    <div className={styles["itinerary-card"]}>
      <div className={styles.header}>
        <p>Plan Your Trip</p>
      </div>

      <div className={styles["form-wrapper"]}>
        <AutoComplete
          id="departure"
          label="Departure:"
          placeholder="Choose a departure station"
          options={["Amsterdam", "Brasilia", "Dusseldorf"]}
          prefix={<IoLocationSharp />}
        />

        <AutoComplete
          id="arrival"
          label="Arrival:"
          placeholder="Choose a departure station"
          options={["Amsterdam", "Brasilia", "Dusseldorf"]}
          prefix={<IoLocationSharp />}
        />

        <div className={styles["time-picker-group"]}>
          <CustomDatePicker
            prefix={<ImCalendar />}
            id="date-picker"
            label="Date:"
          />

          <CustomDatePicker
            isTimePicker={true}
            id="time-picker"
            label="Time:"
            prefix={<ImClock />}
          />
        </div>

        <button type="submit" className={styles["plan-button"]}>
          Plan
        </button>
      </div>
    </div>
  );
}
