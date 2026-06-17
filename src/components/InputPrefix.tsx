import { FaTrain } from "react-icons/fa";
import styles from "./InputPrefix.module.css";

type InputPrefixProps = {
  cityAbreviation: string;
};

export default function InputPrefix({ cityAbreviation }: InputPrefixProps) {
  return (
    <div className={styles["prefix-wrapper"]}>
      <FaTrain />
      <span>{cityAbreviation || "-"}</span>
    </div>
  );
}
