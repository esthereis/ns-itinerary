import AutoComplete from "./AutoComplete";

type ItineraryCardProps = {
  departureList: string[];
  arrivalList: string[];
};

export default function ItineraryCard({
  departureList,
  arrivalList,
}: ItineraryCardProps) {
  return (
    <div>
      <AutoComplete
        items={departureList}
        label="Departure"
        placeholder="Ex: Amsterdam"
      />
      <AutoComplete
        items={arrivalList}
        label="Arrival"
        placeholder="Ex: Rotterdam"
      />
    </div>
  );
}
