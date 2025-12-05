import { nl } from "date-fns/locale/nl";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sharedInputStyles from "../../styles/sharedInputStyle.module.css";
import Input, { InputProps } from "./Input";

type CustomDatePickerProps = Omit<InputProps, "placeholder"> & {
  isTimePicker?: boolean;
  dateFormat?: "dd/MM/yyyy" | "d MMMM yyyy" | "dd/MM/yyyy HH:mm" | "HH:mm";
};

registerLocale("nl", nl);

export default function CustomDatePicker({
  isTimePicker = false,
  dateFormat = "dd/MM/yyyy",
  ...inputProps
}: CustomDatePickerProps) {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <DatePicker
      className={sharedInputStyles.input}
      locale="nl"
      selected={date}
      onChange={(date) => {
        if (date) setDate(date);
        return;
      }}
      customInput={<Input {...inputProps} />}
      showTimeSelect={isTimePicker}
      showTimeSelectOnly={isTimePicker}
      dateFormat={isTimePicker ? "HH:mm" : dateFormat}
    />
  );
}
