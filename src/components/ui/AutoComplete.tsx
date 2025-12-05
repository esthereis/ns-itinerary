import { flip, offset, useFloating } from "@floating-ui/react";
import { useCombobox } from "downshift";
import { ReactNode, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import sharedInputStyles from "../../styles/sharedInputStyle.module.css";
import styles from "./Autocomplete.module.css";

type AutoCompleteProps = {
  id: string;
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

  const handleInputChange = (inputValue: string) => {
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
    selectItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      handleInputChange(inputValue);
    },
    items,
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
          id={id}
          placeholder={placeholder}
          className={sharedInputStyles.input}
          data-prefix={!!prefix}
          {...getInputProps()}
        />
        <button className={styles["toggle-button"]} {...getToggleButtonProps()}>
          {isOpen ? <FaCaretUp /> : <FaCaretDown />}
        </button>
      </div>

      <ul
        className={styles.list}
        {...getMenuProps({ref: refs.setFloating})}
        
        style={floatingStyles}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={styles.item}
              {...getItemProps({ item, index })}
              onClick={() => selectItem(item)}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}
