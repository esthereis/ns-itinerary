import { flip, offset, useFloating } from "@floating-ui/react";
import { useCombobox } from "downshift";
import { useFormikContext } from "formik";
import { ReactNode, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import sharedInputStyles from "../../styles/sharedInputStyle.module.css";
import { ItineraryFormFields } from "../../types/itineraryFormFields";
import styles from "./Autocomplete.module.css";

type AutoCompleteProps = {
  id: keyof Omit<ItineraryFormFields, "date" | "time">;
  label?: string;
  options: string[];
  placeholder: string;
  prefix?: string | ReactNode;
};

export default function AutoComplete({
  id,
  label,
  prefix,
  options,
  placeholder,
}: AutoCompleteProps) {
  const { refs, floatingStyles } = useFloating<HTMLUListElement>({
    placement: "bottom-start",
    middleware: [flip(), offset(4)],
  });
  const [items, setItems] = useState<string[]>(options);
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<ItineraryFormFields>();

  const handleFiltering = (inputValue: string) => {
    const filteredList: string[] = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
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
      setFieldValue(id, selectedItem ?? "");
    },
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
            <li className={styles.item} {...getItemProps({ item, index })}>
              {item}
            </li>
          ))}
      </ul>

      {touched[id] && errors[id] && (
        <span className={styles["error-message"]}>{errors[id]}</span>
      )}
    </div>
  );
}
