import { useState } from "react";
import Button from "./Button";
import styles from "./ToggleMenu.module.css";

type ToggleMenuProps<T> = {
  options: T[];
  handleOption: (option: T) => string;
  handleSelection: (value: T) => void;
};

export default function ToggleMenu<T>({
  options,
  handleOption,
  handleSelection,
}: ToggleMenuProps<T>) {
  const [selected, setSelected] = useState<number>(0);

  const selectOption = (index: number) => {
    setSelected(index);
  };

  return (
    <div className={styles["option-list"]}>
      {options.map((option, index) => (
        <Button
          handleOnClick={() => {
            handleSelection(option);
            selectOption(index);
          }}
          key={index}
          isWhiteButton={selected !== index}
          height="36px"
          width="130px"
        >
          {handleOption?.(option) ?? ""}
        </Button>
      ))}
    </div>
  );
}
