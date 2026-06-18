import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children: string | ReactNode;
  width?: string;
  height?: string;
  isWhiteButton?: boolean;
  handleOnClick?: () => void;
};

export default function Button({
  type = "button",
  children,
  width = "100%",
  height = "56px",
  isWhiteButton = false,
  handleOnClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      style={{ width: width, height: height }}
      className={styles.button}
      onClick={() => handleOnClick?.()}
      data-style={isWhiteButton}
    >
      {children}
    </button>
  );
}
