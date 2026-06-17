import AutoComplete from "./AutoComplete";
import InputPrefix from "./InputPrefix";
import styles from "./ItineraryCard.module.css";

type ItineraryCardProps = {
  departureList: string[];
  arrivalList: string[];
};

export default function ItineraryCard({
  departureList,
  arrivalList,
}: ItineraryCardProps) {
  return (
    <div className={styles["card-wrapper"]}>
      <AutoComplete
        items={departureList}
        label="Departure"
        placeholder="Ex: Amsterdam"
        prefixElement={<InputPrefix />}
        width="280px"
      />
      <AutoComplete
        items={arrivalList}
        label="Arrival"
        placeholder="Ex: Rotterdam"
        prefixElement={<InputPrefix />}
        width="280px"
      />
    </div>
  );
}
