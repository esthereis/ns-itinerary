import { useCombobox, UseComboboxSelectedItemChange } from "downshift";
import styles from "./AutoComplete.module.css";
import Input, { InputProps } from "./Input";

type AutoCompleteProps<T> = {
  items: T[];
  itemToString: (item: T | null) => string;
  onInputValueChange: (inputValue: string) => void;
  onSelectedItemChange: (selected: UseComboboxSelectedItemChange<T>) => unknown;
  inputValue: string;
} & Pick<InputProps, "label" | "placeholder" | "prefixElement" | "width">;

export default function AutoComplete<T>({
  items,
  itemToString,
  width = "100%",
  prefixElement,
  onInputValueChange,
  onSelectedItemChange,
  inputValue,
  ...props
}: AutoCompleteProps<T>) {
  const {
    isOpen,
    getLabelProps,
    getInputProps,
    getToggleButtonProps,
    getItemProps,
    getMenuProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      onInputValueChange(inputValue);
    },
    onSelectedItemChange,
    items,
    itemToString,
    inputValue,
  });

  return (
    <div style={{ width: width }}>
      <Input
        inputProps={getInputProps()}
        labelProps={getLabelProps()}
        toggleButtonProps={getToggleButtonProps()}
        isOpen={isOpen}
        width={width}
        prefixElement={prefixElement}
        isAutoComplete
        {...props}
      />

      <ul
        className={styles["stations-list"]}
        style={{ width: width }}
        data-active={isOpen}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              data-prefix={!!prefixElement}
              key={index}
              {...getItemProps({ item, index })}
            >
              {itemToString(item)}
            </li>
          ))}
      </ul>
    </div>
  );
}
