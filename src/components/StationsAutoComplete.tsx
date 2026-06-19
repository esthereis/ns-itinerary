import { Dispatch, SetStateAction } from "react";
import { StationName } from "../types/train";
import AutoComplete from "./AutoComplete";
import InputPrefix from "./InputPrefix";
import { getStations } from "../services/travel";

type StationsAutoCompleteProps = {
  label: string;
  placeholder: string;
  items: StationName[];
  selectedRoute: StationName | null;
  setStations: (stations: StationName[]) => void;
  setSelectedRoute: Dispatch<SetStateAction<StationName | null>>;
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
    setState: (stations: StationName[]) => void,
  ) => {
    getStations(inputValue).then((response) => {
      setState(response);
    });
  };

  return (
    <AutoComplete<StationName>
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
      itemToString={(departure: StationName | null) =>
        departure?.stationName ?? ""
      }
      onSelectedItemChange={(selected) =>
        setSelectedRoute(selected.selectedItem)
      }
      inputValue={selectedRoute?.stationName ?? ""}
    />
  );
}
