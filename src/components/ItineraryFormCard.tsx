import { Form, Formik } from "formik";
import { ImCalendar, ImClock } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { date, object, string } from "yup";
import { ItineraryFormFields } from "../types/itineraryFormFields";
import { combineDateAndTime } from "../utils/formatDate";
import { useTripContext } from "./context/TripContext";
import styles from "./ItineraryFormCard.module.css";
import AutoComplete from "./ui/AutoComplete";
import CustomDatePicker from "./ui/CustomDatePicker";

export default function ItineraryFormCard() {
  const { planJourney } = useTripContext();

  const handleSubmit = (values: ItineraryFormFields) => {
    const formattedDate = combineDateAndTime(values.date, values.time);
    planJourney({
      originCode: values.origin.trainCode,
      destinyCode: values.destiny.trainCode,
      dateTime: formattedDate,
      route: "departure",
    });
  };

  return (
    <Formik
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      initialValues={{
        origin: { trainCode: "", stationName: "" },
        destiny: { trainCode: "", stationName: "" },
        date: new Date(),
        time: new Date(),
      }}
      validationSchema={object().shape({
        origin: object().shape({
          trainCode: string(),
          stationName: string()
            .required("Please fill the origin field.")
            .max(40, "Must be 40 characters  or less"),
        }),
        destiny: object().shape({
          trainCode: string(),
          stationName: string()
            .required("Please fill the origin field.")
            .max(40, "Must be 40 characters  or less"),
        }),
        date: date(),
        time: date(),
      })}
    >
      <Form className={styles["itinerary-card"]}>
        <div className={styles.header}>
          <p>Plan Your Trip</p>
        </div>

        <div className={styles["form-wrapper"]}>
          <AutoComplete
            id="origin"
            label="Origin:"
            placeholder="Choose a origin station"
            prefix={<IoLocationSharp />}
          />

          <AutoComplete
            id="destiny"
            label="Destiny:"
            placeholder="Choose a departure station"
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
      </Form>
    </Formik>
  );
}
