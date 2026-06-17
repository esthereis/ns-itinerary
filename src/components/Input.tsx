import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import styles from "./Input.module.css";

export type InputProps = {
  label: string;
  placeholder: string;
  prefixElement?: ReactNode;
  isOpen: boolean;
  inputProps: Input;
  labelProps: Label;
  toggleButtonProps: ToggleButton;
  width?: string;
};

type Input = InputHTMLAttributes<HTMLInputElement>;
type Label = LabelHTMLAttributes<HTMLLabelElement>;
type ToggleButton = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Input({
  label,
  placeholder,
  prefixElement,
  isOpen,
  inputProps,
  labelProps,
  toggleButtonProps,
  width = "100%",
}: InputProps) {
  return (
    <div className={styles["input-wrapper"]}>
      <div className={styles["input-container"]} style={{ width }}>
        {prefixElement && (
          <div className={styles["prefix-wrapper"]}>{prefixElement}</div>
        )}
        <label
          data-prefix={!!prefixElement}
          className={styles.label}
          {...labelProps}
        >
          {label}
        </label>

        <input
          data-prefix={!!prefixElement}
          type="text"
          placeholder={placeholder}
          className={styles.input}
          style={{ width: width }}
          {...inputProps}
        />

        <button
          type="button"
          aria-label="toggle-button"
          className={styles["toggle-button"]}
          {...toggleButtonProps}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
    </div>
  );
}
