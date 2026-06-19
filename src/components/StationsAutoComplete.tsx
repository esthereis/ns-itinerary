import { Dispatch, SetStateAction } from "react";
import { TrainResponse } from "../types/train";
import AutoComplete from "./AutoComplete";
import InputPrefix from "./InputPrefix";
import { getTrainInformation } from "../services/travel";

type StationsAutoCompleteProps = {
  label: string;
  placeholder: string;
  items: TrainResponse[];
  selectedRoute: TrainResponse | null;
  setStations: (stations: TrainResponse[]) => void;
  setSelectedRoute: Dispatch<SetStateAction<TrainResponse | null>>;
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
    setState: (stations: TrainResponse[]) => void,
  ) => {
    getTrainInformation(inputValue).then((response) => {
      setState(response);
    });
  };

  return (
    <AutoComplete<TrainResponse>
      width="280px"
      items={items}
      label={label}
      placeholder={placeholder}
      prefixElement={
        <InputPrefix cityAbreviation={selectedRoute?.trainAbreviation ?? ""} />
      }
      onInputValueChange={(inputValue: string) => {
        setSelectedRoute((previous) => {
          if (!inputValue) return null;
          if (previous) {
            return { ...previous, stationName: inputValue };
          }
          return {
            trainCode: "",
            stationName: inputValue,
            trainAbreviation: "",
          };
        });

        updateStations(inputValue, setStations);
      }}
      itemToString={(departure: TrainResponse | null) =>
        departure?.stationName ?? ""
      }
      onSelectedItemChange={(selected) =>
        setSelectedRoute(selected.selectedItem)
      }
      inputValue={selectedRoute?.stationName ?? ""}
    />
  );
}
