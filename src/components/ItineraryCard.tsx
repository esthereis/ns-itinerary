import Button from "./Button";
import CustomDatePicker from "./CustomDatePicker";
import styles from "./ItineraryCard.module.css";
import { FaExchangeAlt } from "react-icons/fa";
import ToggleMenu from "./ToggleMenu";
import { useState } from "react";
import { Station } from "../types/train";
import StationsAutoComplete from "./StationsAutoComplete";
import { useTripContext } from "./TripContext";

export default function ItineraryCard() {
  const [departureStations, setDepartureStations] = useState<Station[]>([]);
  const [arrivalStations, setArrivalStations] = useState<Station[]>([]);
  const [selectedArrival, setSelectedArrival] = useState<Station | null>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<Station | null>(
    null,
  );
  const [route, setRoute] = useState<string>("arrival");
  const [date, setDate] = useState<{ day: Date; time: Date }>({
    day: new Date(),
    time: new Date(),
  });
  const { planJourney } = useTripContext();

  const switchRoutes = () => {
    setSelectedDeparture(selectedArrival);
    setSelectedArrival(selectedDeparture);
  };

  const handleOnClick = () => {
    if (!selectedDeparture?.stationCode || !selectedArrival?.stationCode) {
      return;
    }

    planJourney({
      origin: selectedDeparture?.stationCode,
      destiny: selectedArrival?.stationCode,
      dateTime: date.day,
      route: route,
    });
  };

  return (
    <div className={styles["card-wrapper"]}>
      <ToggleMenu
        options={[
          { label: "Arrival", value: "arrival" },
          { label: "Departure", value: "departure" },
        ]}
        handleOption={(option) => option.label}
        handleSelection={(selection) => setRoute(selection.value)}
      />

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

        <Button width="180px" handleOnClick={() => handleOnClick()}>
          Plan your trip
        </Button>
      </div>
    </div>
  );
}
