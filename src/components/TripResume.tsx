import { Trip } from "../types/trip";
import { getDayOrTime } from "../utils/date";
import { useTripContext } from "./TripContext";
import { FaRegDotCircle } from "react-icons/fa";
import styles from "./TripResume.module.css";

type LegPathProps = {
  time: string;
  stationName: string;
  isLastDestiny?: boolean;
  notes?: string[];
};

function LegPath({
  time,
  stationName,
  isLastDestiny = false,
  notes,
}: LegPathProps) {
  return (
    <div className={styles.row}>
      <span className={styles["path-time"]}>{time}</span>
      {isLastDestiny ? <FaRegDotCircle /> : <VerticalLine />}
      <span>{stationName}</span>
      {notes && notes.map((note, index) => <span key={index}>{note}</span>)}
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
          time={getDayOrTime(referenceTrip.departureTime, "time")}
          stationName={referenceTrip.legs[0].origin}
          notes={referenceTrip.legs[0].notes}
        />
        {referenceTrip.legs?.map((leg, index) => {
          if (index > 0) {
            return (
              <LegPath
                key={index}
                time={getDayOrTime(leg.departureTime, "time")}
                stationName={leg.origin}
                notes={leg.notes}
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
