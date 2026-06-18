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
  width?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  isAutoComplete?: boolean;
  isOpen?: boolean;
  inputProps?: Input;
  labelProps?: Label;
  toggleButtonProps?: ToggleButton;
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
  type = "text",
  toggleButtonProps,
  width = "100%",
  isAutoComplete = false,
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
          type={type}
          placeholder={placeholder}
          className={styles.input}
          style={{ width: width }}
          {...inputProps}
        />

        {isAutoComplete && (
          <button
            type="button"
            aria-label="toggle-button"
            className={styles["toggle-button"]}
            {...toggleButtonProps}
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}
      </div>
    </div>
  );
}
