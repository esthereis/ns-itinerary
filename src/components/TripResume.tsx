import { Trip } from "../types/trip";
import { getDayOrTime } from "../utils/date";
import { useTripContext } from "./TripContext";
import { FaRegDotCircle } from "react-icons/fa";
import styles from "./TripResume.module.css";

type CheckPointsProps = {
  time: string;
  stationName: string;
  isLastDestiny?: boolean;
  legDuration?: number;
  notes?: string[];
};

function CheckPoints({ time, stationName }: CheckPointsProps) {
  return (
    <div className={styles.row}>
      <span className={styles["path-time"]}>{time}</span>
      <FaRegDotCircle />
      <span>{stationName}</span>
    </div>
  );
}

type LegInfosProps = {
  duration: number;
  notes: string[];
};

function LegInfos({ duration, notes }: LegInfosProps) {
  return (
    <div className={`${styles.row} ${styles.infos}`}>
      <span className={styles["path-time"]}>{duration}</span>

      <div className={styles["vertical-line"]} />
      {notes && (
        <div className={styles.notes}>
          {notes.map((note, index) => (
            <span key={index}>{note}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TripResume() {
  const { selectedTrip, trips } = useTripContext();
  const referenceTrip: Trip = selectedTrip ?? trips[0];
  console.log(selectedTrip);

  if (!referenceTrip || !referenceTrip.legs) {
    return undefined;
  }

  const lastDestinyIndex: number = referenceTrip.legs?.length - 1;

  return (
    <div className={styles["trip-details-card"]}>
      <div className={styles["time-line"]}>
        {selectedTrip?.legs?.map((leg, index) => {
          return (
            <>
              <CheckPoints
                key={index}
                time={getDayOrTime(leg.departureTime, "time")}
                stationName={leg.origin}
              />
              <LegInfos duration={leg.duration} notes={leg.notes} />
            </>
          );
        })}
        <CheckPoints
          time={getDayOrTime(referenceTrip.arrivalTime, "time")}
          isLastDestiny
          stationName={referenceTrip.legs[lastDestinyIndex].destiny}
        />
      </div>
    </div>
  );
}
