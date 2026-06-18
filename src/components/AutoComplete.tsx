import { useCombobox } from "downshift";
import { useState } from "react";
import styles from "./AutoComplete.module.css";

import Input, { InputProps } from "./Input";

type AutoCompleteProps = {
  items: string[];
} & Pick<InputProps, "label" | "placeholder" | "prefixElement" | "width">;

function getList(list: string[], inputValue: string): string[] {
  if (inputValue) {
    return list.filter((item) =>
      item.toLowerCase().includes(inputValue.toLocaleLowerCase()),
    );
  }
  return list;
}

export default function AutoComplete({
  items,
  width = "100%",
  prefixElement,
  ...props
}: AutoCompleteProps) {
  const [list, setList] = useState<string[]>(items);
  const {
    isOpen,
    getLabelProps,
    getInputProps,
    getToggleButtonProps,
    getItemProps,
    getMenuProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setList(getList(items, inputValue));
    },
    items,
    itemToString(item) {
      return item ?? "";
    },
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
          list.map((item, index) => (
            <li
              data-prefix={!!prefixElement}
              key={index}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}
