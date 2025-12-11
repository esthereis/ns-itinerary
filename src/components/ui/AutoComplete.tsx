import { flip, offset, useFloating } from "@floating-ui/react";
import { useCombobox } from "downshift";
import { useField } from "formik";
import { ReactNode, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { getTrainInformation } from "../../services/travel";
import sharedInputStyles from "../../styles/sharedInputStyle.module.css";
import { ItineraryFormFields } from "../../types/itineraryFormFields";
import { Train } from "../../types/train";
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
  const [field, meta, helpers] = useField<Train>(id);

  const [inputValue, setInputValue] = useState<string>(
    field.value?.stationName ?? ""
  );
  const [items, setItems] = useState<Train[]>([]);
  const { refs, floatingStyles } = useFloating<HTMLUListElement>({
    placement: "bottom-start",
    middleware: [flip(), offset(4)],
  });

  useEffect(() => {
    if (inputValue) {
      getTrainInformation(inputValue).then((response) =>
        setItems(response ?? [])
      );
    }
  }, [inputValue]);

  const {
    isOpen,
    getInputProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    getToggleButtonProps,
  } = useCombobox({
    items,
    inputValue: inputValue ?? "",
    onInputValueChange({ inputValue }) {
      setInputValue(inputValue);
    },
    onSelectedItemChange({ selectedItem }) {
      if (!selectedItem) {
        return;
      }

      setInputValue(selectedItem.stationName);
      helpers.setValue(selectedItem);
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
          {...getInputProps({ onBlur: field.onBlur })}
          id={id}
        />

        <button
          type="button"
          className={styles["toggle-button"]}
          {...getToggleButtonProps()}
        >
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

      {meta.touched && meta.error && (
        <span className={styles["error-message"]}>
          {(meta.error as unknown as Train).stationName}
        </span>
      )}
    </div>
  );
}
