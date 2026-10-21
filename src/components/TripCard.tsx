import { Leg } from "../types/trip";
import styles from "./TripCard.module.css";
import { FaMapMarkerAlt, FaRegDotCircle, FaRandom } from "react-icons/fa";
import { getDayOrTime } from "../utils/date";

type TripCardProps = {
  departureTime: string;
  arrivalTime: string;
  legs: Leg[] | undefined;
  onSelect: () => void;
};

type LegPathProps = {
  time: string;
  stationName: string;
  type: "departure" | "arrival" | "leg";
};
//TODO: MODIFICAR TRIP CARD, para representar o tipo de transporte, exemplo: trem ou metrô ao invés do nome das estações, conferir: network --> preview --> legs --> index -->product --> shortCatergoryName e type
function LegPath({ time, stationName, type }: LegPathProps) {
  return (
    <div className={styles.column}>
      <span>{time}</span>

      <div className={styles["leg-line-wrapper"]}>
        {type === "departure" && <FaRegDotCircle className={styles.icons} />}
        {type === "leg" && <FaRandom />}
        {type === "arrival" && <FaMapMarkerAlt />}

        {type !== "arrival" && <div className={styles["leg-line"]} />}
      </div>

      <span className={styles["station-names"]}>{stationName}</span>
    </div>
  );
}

export default function TripCard({
  departureTime,
  arrivalTime,
  legs,
  onSelect,
}: TripCardProps) {
  if (!legs) {
    return;
  }

  const destinyLenght = legs.length;
  console.log(legs);
  return (
    <div className={styles["trip-card"]} onClick={() => onSelect()}>
      <div className={styles.legs}>
        <LegPath
          time={departureTime}
          type="departure"
          stationName={legs[0].origin}
        />

        {legs &&
          legs?.length > 1 &&
          legs.map((leg, index) => {
            return (
              <LegPath
                key={index}
                time={getDayOrTime(leg.arrivalTime, "time")}
                type="leg"
                stationName={leg.destiny}
              />
            );
          })}

        <LegPath
          time={arrivalTime}
          type="arrival"
          stationName={legs[destinyLenght - 1].destiny}
        />
      </div>
    </div>
  );
}
