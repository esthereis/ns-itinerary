import { Leg } from "../types/trip";
import styles from "./TripCard.module.css";
import { FaMapMarkerAlt, FaRegDotCircle, FaRandom } from "react-icons/fa";

type TripCardProps = {
  departureTime: string;
  arrivalTime: string;
  legs: Leg[] | undefined;
  onSelect: () => void;
};

export default function TripCard({
  departureTime,
  arrivalTime,
  legs,
  onSelect,
}: TripCardProps) {
  return (
    <div className={styles["trip-card"]} onClick={() => onSelect()}>
      <div className={styles.time}>
        <span>{departureTime}</span>
        <span>{arrivalTime}</span>
      </div>

      <div className={styles["legs-wrapper"]}>
        <FaRegDotCircle />

        <div className={styles.legs}>
          {legs &&
            legs.map((leg, index) => (
              <div className={styles.column} key={leg.key}>
                <div className={styles["leg-row"]}>
                  <div className={styles["leg-line"]} />
                  {index !== legs.length - 1 && <FaRandom />}
                </div>
                {leg.origin}
                {leg.destiny}
              </div>
            ))}
          <div className={styles["leg-line"]} />
        </div>

        <FaMapMarkerAlt />
      </div>
    </div>
  );
}
