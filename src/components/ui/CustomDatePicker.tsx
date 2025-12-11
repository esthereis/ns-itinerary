import { nl } from "date-fns/locale/nl";
import { useFormikContext } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sharedInputStyles from "../../styles/sharedInputStyle.module.css";
import { ItineraryFormFields } from "../../types/itineraryFormFields";
import Input, { InputProps } from "./Input";

type CustomDatePickerProps = Omit<InputProps, "placeholder" | "id"> & {
  isTimePicker?: boolean;
  dateFormat?: "dd/MM/yyyy" | "d MMMM yyyy" | "dd/MM/yyyy HH:mm" | "HH:mm";
  id: DatePickerId;
};

type DatePickerId = keyof ItineraryFormFields;

registerLocale("nl", nl);

export default function CustomDatePicker({
  isTimePicker = false,
  dateFormat = "dd/MM/yyyy",
  id,
  ...inputProps
}: CustomDatePickerProps) {
  const { setFieldValue, values } = useFormikContext<ItineraryFormFields>();

  const selectedDate = values[id] as Date;

  return (
    <DatePicker
      className={sharedInputStyles.input}
      locale="nl"
      selected={selectedDate}
      onChange={(date) => {
        if (date) setFieldValue(id, date);
      }}
      customInput={<Input id={id} {...inputProps} />}
      showTimeSelect={isTimePicker}
      showTimeSelectOnly={isTimePicker}
      dateFormat={isTimePicker ? "HH:mm" : dateFormat}
    />
  );
}
