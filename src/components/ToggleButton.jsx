import { array, string, func } from "prop-types";
import styles from "./ToggleButton.module.css";

export default function ToggleButton({ options, value, onSelect }) {
  return (
    <div className={styles["button-group"]}>
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          className={`${styles.button} ${
            value === option.value ? styles.selected : ""
          }`}
          onClick={() => onSelect(option.value)}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}

ToggleButton.propTypes = {
  options: array.isRequired,
  value: string.isRequired,
  onSelect: func.isRequired,
};
