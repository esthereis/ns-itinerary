import { useCombobox } from "downshift";
import { ReactNode, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

type AutoCompleteProps = {
  items: string[];
  label: string;
  placeholder: string;
};

function getList(list: string[], inputValue: string): string[] {
  if (inputValue) {
    return list.filter((item) =>
      item.toLowerCase().includes(inputValue.toLocaleLowerCase()),
    );
  }
  return [];
}

export default function AutoComplete({
  items,
  label,
  placeholder,
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
    <div>
      <label {...getLabelProps()}>{label}</label>
      <div>
        <input type="text" placeholder={placeholder} {...getInputProps()} />
        <button
          type="button"
          aria-label="toggle-button"
          {...getToggleButtonProps()}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {isOpen && (
        <ul {...getMenuProps()}>
          {list.map((item, index) => (
            <li key={index} {...getItemProps({ item, index })}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
