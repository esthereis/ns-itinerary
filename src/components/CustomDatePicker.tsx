import { ReactNode, useState } from "react";
import { CalendarContainer, DatePicker } from "react-datepicker";
import inputStyles from "./Input.module.css";
import styles from "./CustomDatePicker.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import "../datepicker.css";

type CustomDatePickerProps = {
  label: string;
  type?: "date" | "time";
};

type CalendarWrapperProps = {
  className: string;
  children: ReactNode;
};

export default function CustomDatePicker({
  label,
  type = "date",
}: CustomDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isOpen, setOpen] = useState<boolean>(false);

  const CalendarWrapper = ({ className, children }: CalendarWrapperProps) => {
    return (
      <CalendarContainer className={className}>{children}</CalendarContainer>
    );
  };

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const isTime = type === "time";

  return (
    <div className={styles["date-picker-wrapper"]}>
      <label
        data-prefix={true}
        className={`${inputStyles.label} ${styles.label}`}
      >
        {label}
      </label>

      {isTime ? (
        <FaClock
          className={styles["calendar-icon"]}
          onClick={() => setOpen(true)}
        />
      ) : (
        <FaCalendarAlt
          className={styles["calendar-icon"]}
          onClick={() => setOpen(true)}
        />
      )}

      <DatePicker
        open={isOpen}
        selected={selectedDate}
        onChange={handleChange}
        className={`${inputStyles.input} ${styles["date-picker"]}`}
        onCalendarOpen={() => setOpen(true)}
        onCalendarClose={() => setOpen(false)}
        dateFormat={isTime ? "HH:mm" : "dd/MM/yyyy"}
        showTimeSelect={isTime}
        showTimeSelectOnly={isTime}
        calendarContainer={CalendarWrapper}
      />
    </div>
  );
}
