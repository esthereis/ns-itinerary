import { Trip } from "../types/trip";
import { getDayOrTime } from "../utils/date";
import { useTripContext } from "./TripContext";
import { FaRegDotCircle } from "react-icons/fa";
import styles from "./TripResume.module.css";

type LegPathProps = {
  time: string;
  stationName: string;
  isLastDestiny?: boolean;
};

function LegPath({ time, stationName, isLastDestiny = false }: LegPathProps) {
  return (
    <div className={styles.row}>
      <span className={styles["path-time"]}>{time}</span>
      {isLastDestiny ? <FaRegDotCircle /> : <VerticalLine />}
      <span>{stationName}</span>
    </div>
  );
}

function VerticalLine() {
  return (
    <div className={styles["checkpoint-wrapper"]}>
      <FaRegDotCircle />
      <div className={styles["vertical-line"]} />
    </div>
  );
}

export default function TripResume() {
  const { selectedTrip, trips } = useTripContext();
  const referenceTrip: Trip = selectedTrip ?? trips[0];

  if (!referenceTrip || !referenceTrip.legs) {
    return undefined;
  }

  const lastDestinyIndex: number = referenceTrip.legs?.length - 1;

  return (
    <div className={styles["trip-details-card"]}>
      <div className={styles["time-line"]}>
        <LegPath
          time={getDayOrTime(referenceTrip.arrivalTime, "time")}
          stationName={referenceTrip.legs[0].origin}
        />

        {referenceTrip.legs?.map((leg, index) => {
          if (index > 0) {
            return (
              <LegPath
                key={index}
                time={getDayOrTime(leg.departureTime, "time")}
                stationName={leg.origin}
              />
            );
          }
          return undefined;
        })}

        <LegPath
          time={getDayOrTime(referenceTrip.arrivalTime, "time")}
          isLastDestiny
          stationName={referenceTrip.legs[lastDestinyIndex].destiny}
        />
      </div>
    </div>
  );
}
