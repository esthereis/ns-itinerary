import AutoComplete from "./AutoComplete";
import Button from "./Button";
import CustomDatePicker from "./CustomDatePicker";
import InputPrefix from "./InputPrefix";
import styles from "./ItineraryCard.module.css";
import { FaExchangeAlt } from "react-icons/fa";
import ToggleMenu from "./ToggleMenu";
import { useState } from "react";
import { TrainResponse } from "../types/train";
import { getTrainInformation } from "../services/travel";

export default function ItineraryCard() {
  const [departure, setDeparture] = useState<TrainResponse[]>([]);
  const [arrival, setArrival] = useState<TrainResponse[]>([]);
  const [abbreviations, setAbbreviations] = useState<{
    departureAbbr: string;
    arrivalAbbr: string;
  }>({ departureAbbr: "", arrivalAbbr: "" });

  const updateRoute = (
    inputValue: string,
    setState: (routeList: TrainResponse[]) => void,
  ) => {
    getTrainInformation(inputValue).then((response) => {
      setState(response);
    });
  };

  return (
    <div className={styles["card-wrapper"]}>
      <ToggleMenu options={["Arrival", "Departure"]} />
      <div className={styles["form-wrapper"]}>
        <div className={styles["itinerary-buttons"]}>
          <AutoComplete<TrainResponse>
            width="280px"
            items={departure}
            label="Departure"
            placeholder="Ex: Amsterdam"
            prefixElement={
              <InputPrefix cityAbreviation={abbreviations.departureAbbr} />
            }
            onInputValueChange={(inputValue: string) =>
              updateRoute(inputValue, setDeparture)
            }
            itemToString={(departure: TrainResponse | null) =>
              departure?.stationName ?? ""
            }
            onSelectedItemChange={(selected) =>
              setAbbreviations((previous) => {
                return {
                  ...previous,
                  departureAbbr: selected.selectedItem?.trainAbreviation ?? "",
                };
              })
            }
          />

          <Button width="50px" height="50px">
            {<FaExchangeAlt />}
          </Button>

          <AutoComplete<TrainResponse>
            width="280px"
            items={arrival}
            label="Arrival"
            placeholder="Ex: Rotterdam"
            prefixElement={
              <InputPrefix cityAbreviation={abbreviations.arrivalAbbr} />
            }
            onInputValueChange={(inputValue: string) =>
              updateRoute(inputValue, setArrival)
            }
            itemToString={(arrival: TrainResponse | null) =>
              arrival?.stationName ?? ""
            }
            onSelectedItemChange={(selected) =>
              setAbbreviations((previous) => {
                return {
                  ...previous,
                  arrivalAbbr: selected.selectedItem?.trainAbreviation ?? "",
                };
              })
            }
          />
        </div>

        <CustomDatePicker label="Departure Date" width="280px" />
        <CustomDatePicker label="Departure Time" type="time" width="280px" />

        <Button width="180px">Plan your trip</Button>
      </div>
    </div>
  );
}
