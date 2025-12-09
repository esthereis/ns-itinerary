import { flip, offset, useFloating } from "@floating-ui/react";
import { useCombobox } from "downshift";
import { useFormikContext } from "formik";
import { ReactNode, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { getTrainInformation } from "../../services/travel";
import sharedInputStyles from "../../styles/sharedInputStyle.module.css";
import { ItineraryFormFields } from "../../types/itineraryFormFields";
import { TrainResponse } from "../../types/train";
import styles from "./Autocomplete.module.css";

type AutoCompleteProps = {
  id: keyof Omit<ItineraryFormFields, "date" | "time">;
  label?: string;
  placeholder: string;
  prefix?: string | ReactNode;
};

export default function AutoComplete({
  id,
  label,
  prefix,
  placeholder,
}: AutoCompleteProps) {
  const [items, setItems] = useState<TrainResponse[]>([]);
  const [trainList, setTrainList] = useState<TrainResponse[]>([]);
  const { refs, floatingStyles } = useFloating<HTMLUListElement>({
    placement: "bottom-start",
    middleware: [flip(), offset(4)],
  });
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<ItineraryFormFields>();

  useEffect(() => {
    getTrainInformation(values[id]).then((response) =>
      setTrainList(response ?? [])
    );
  }, [values[id]]);

  const handleFiltering = (inputValue: string) => {
    const filteredList: TrainResponse[] = trainList.filter((item) =>
      item.stationName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setItems(filteredList);
  };

  const {
    isOpen,
    getInputProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    getToggleButtonProps,
  } = useCombobox({
    items,
    inputValue: values[id] ?? "",
    onInputValueChange({ inputValue }) {
      setFieldValue(id, inputValue || "");
      handleFiltering(inputValue);
    },
    onSelectedItemChange({ selectedItem }) {
      setFieldValue(id, selectedItem?.stationName ?? "");
    },
    itemToString: (item) => item?.stationName ?? "",
  });

  return (
    <div className={sharedInputStyles["input-wrapper"]}>
      <label htmlFor={id} {...getLabelProps()}>
        {label}
      </label>

      <div
        className={sharedInputStyles["input-container"]}
        ref={refs.setReference}
      >
        <div className={sharedInputStyles.prefix}>{prefix}</div>

        <input
          placeholder={placeholder || undefined}
          className={sharedInputStyles.input}
          data-prefix={!!prefix}
          {...getInputProps({ onBlur: handleBlur })}
          id={id}
        />

        <button className={styles["toggle-button"]} {...getToggleButtonProps()}>
          {isOpen ? <FaCaretUp /> : <FaCaretDown />}
        </button>
      </div>

      <ul
        className={styles.list}
        {...getMenuProps({ ref: refs.setFloating })}
        style={floatingStyles}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={styles.item}
              key={item.trainCode}
              {...getItemProps({ item, index })}
            >
              {item.stationName}
            </li>
          ))}
      </ul>

      {touched[id] && errors[id] && (
        <span className={styles["error-message"]}>{errors[id]}</span>
      )}
    </div>
  );
}
