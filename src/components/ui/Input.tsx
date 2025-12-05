import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import sharedInputStyles from "../../styles/sharedInputStyle.module.css";

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, "prefix">;

export type InputProps = InputAttributes & {
  id: string;
  label?: string;
  placeholder?: string;
  prefix?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, placeholder, prefix, label, ...props }, ref) => {
    return (
      <div className={sharedInputStyles.inputWrapper}>
        <label htmlFor={id}>{label}</label>

        <div className={sharedInputStyles["input-container"]}>
          <div className={sharedInputStyles.prefix}>{prefix}</div>
          <input
            ref={ref}
            id={id}
            placeholder={placeholder}
            data-prefix={!!prefix}
            className={sharedInputStyles.input}
            {...props}
          />
        </div>
      </div>
    );
  }
);

export default Input;
