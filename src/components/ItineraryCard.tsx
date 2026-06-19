import Button from "./Button";
import CustomDatePicker from "./CustomDatePicker";
import styles from "./ItineraryCard.module.css";
import { FaExchangeAlt } from "react-icons/fa";
import ToggleMenu from "./ToggleMenu";
import { useState } from "react";
import { StationName } from "../types/train";
import StationsAutoComplete from "./StationsAutoComplete";

type SelectedRoute = {
  routeAbbr: string;
  station: string;
};

export default function ItineraryCard() {
  const [departureStations, setDepartureStations] = useState<StationName[]>([]);
  const [arrivalStations, setArrivalStations] = useState<StationName[]>([]);
  const [selectedArrival, setSelectedArrival] = useState<StationName | null>(
    null,
  );
  const [selectedDeparture, setSelectedDeparture] =
    useState<StationName | null>(null);

  const switchRoutes = () => {
    const temporaryStation = selectedDeparture;
    setSelectedDeparture(selectedArrival);
    setSelectedArrival(temporaryStation);
  };

  return (
    <div className={styles["card-wrapper"]}>
      <ToggleMenu options={["Arrival", "Departure"]} />
      <div className={styles["form-wrapper"]}>
        <div className={styles["itinerary-buttons"]}>
          <StationsAutoComplete
            label="Departure"
            placeholder="Ex: Amsterdam Centraal"
            items={departureStations}
            selectedRoute={selectedDeparture}
            setStations={setDepartureStations}
            setSelectedRoute={setSelectedDeparture}
          />

          <Button
            width="50px"
            height="50px"
            handleOnClick={() => switchRoutes()}
          >
            {<FaExchangeAlt />}
          </Button>

          <StationsAutoComplete
            label="Arrival"
            placeholder="Ex: Rotterdam Centraal"
            items={arrivalStations}
            selectedRoute={selectedArrival}
            setStations={setArrivalStations}
            setSelectedRoute={setSelectedArrival}
          />
        </div>

        <CustomDatePicker label="Departure Date" width="280px" />
        <CustomDatePicker label="Departure Time" type="time" width="280px" />

        <Button width="180px">Plan your trip</Button>
      </div>
    </div>
  );
}
