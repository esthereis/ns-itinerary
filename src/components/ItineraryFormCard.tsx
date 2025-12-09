import { Formik } from "formik";
import { ImCalendar, ImClock } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { date, object, string } from "yup";
import styles from "./ItineraryFormCard.module.css";
import AutoComplete from "./ui/AutoComplete";
import CustomDatePicker from "./ui/CustomDatePicker";

export default function ItineraryFormCard() {
  return (
    <Formik
      onSubmit={(values) => console.log(values)}
      initialValues={{
        departure: "",
        arrival: "",
        date: new Date(),
        time: new Date(),
      }}
      validationSchema={object().shape({
        departure: string()
          .required()
          .max(40, "Must be 40 characters  or less"),
        arrival: string().required().max(40, "Must be 40 characters  or less"),
        date: date(),
        time: date(),
      })}
    >
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
            <CustomDatePicker prefix={<ImCalendar />} id="date" label="Date:" />

            <CustomDatePicker
              isTimePicker={true}
              id="time"
              label="Time:"
              prefix={<ImClock />}
            />
          </div>

          <button type="submit" className={styles["plan-button"]}>
            Plan
          </button>
        </div>
      </div>
    </Formik>
  );
}
