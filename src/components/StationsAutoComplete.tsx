import { Dispatch, SetStateAction } from "react";
import { Station } from "../types/train";
import AutoComplete from "./AutoComplete";
import InputPrefix from "./InputPrefix";
import { getStations } from "../services/travel";

type StationsAutoCompleteProps = {
  label: string;
  placeholder: string;
  items: Station[];
  selectedRoute: Station | null;
  setStations: (stations: Station[]) => void;
  setSelectedRoute: Dispatch<SetStateAction<Station | null>>;
};

export default function StationsAutoComplete({
  label,
  placeholder,
  items,
  selectedRoute,
  setStations,
  setSelectedRoute,
}: StationsAutoCompleteProps) {
  const updateStations = (
    inputValue: string,
    setState: (stations: Station[]) => void,
  ) => {
    getStations(inputValue).then((response) => {
      setState(response);
    });
  };

  return (
    <AutoComplete<Station>
      width="280px"
      items={items}
      label={label}
      placeholder={placeholder}
      prefixElement={
        <InputPrefix
          cityAbreviation={selectedRoute?.stationAbreviation ?? ""}
        />
      }
      onInputValueChange={(inputValue: string) => {
        setSelectedRoute((previous) => {
          if (!inputValue) return null;
          if (previous) {
            return { ...previous, stationName: inputValue };
          }
          return {
            stationCode: "",
            stationName: inputValue,
            stationAbreviation: "",
          };
        });

        updateStations(inputValue, setStations);
      }}
      itemToString={(departure: Station | null) => departure?.stationName ?? ""}
      onSelectedItemChange={(selected) =>
        setSelectedRoute(selected.selectedItem)
      }
      inputValue={selectedRoute?.stationName ?? ""}
    />
  );
}
