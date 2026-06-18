import { useState } from "react";
import Button from "./Button";
import styles from "./ToggleMenu.module.css";

type ToggleMenuProps = {
  options: string[];
};

export default function ToggleMenu({ options }: ToggleMenuProps) {
  const [selected, setSelected] = useState<number>(0);

  const selectOption = (index: number) => {
    setSelected(index);
  };

  return (
    <div className={styles["option-list"]}>
      {options.map((option, index) => (
        <Button
          handleOnClick={() => selectOption(index)}
          key={index}
          isWhiteButton={selected !== index}
          height="36px"
          width="130px"
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
