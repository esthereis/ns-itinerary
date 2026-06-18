import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children: string | ReactNode;
  width?: string;
  height?: string;
};

export default function Button({
  type = "button",
  children,
  width = "100%",
  height = "56px",
}: ButtonProps) {
  return (
    <button
      type={type}
      style={{ width: width, height: height }}
      className={styles.button}
    >
      {children}
    </button>
  );
}
