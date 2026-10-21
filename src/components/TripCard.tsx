import { Leg } from "../types/trip";
import styles from "./TripCard.module.css";
import {
  FaMapMarkerAlt,
  FaRegDotCircle,
  FaRandom,
  FaBusAlt,
  FaTrain,
} from "react-icons/fa";
import { getDayOrTime } from "../utils/date";
import { ReactNode } from "react";

type TripCardProps = {
  departureTime: string;
  arrivalTime: string;
  legs: Leg[] | undefined;
  onSelect: () => void;
};

type LegPathProps = {
  time: string;
  stationName?: string;
  pathType: "departure" | "arrival" | "leg";
  transportType: string;
  transportCode?: string;
};

function LegPath({
  time,
  stationName,
  pathType,
  transportType,
  transportCode,
}: LegPathProps) {
  const transportTypes: Record<string, ReactNode> = {
    train: <FaTrain />,
    bus: <FaBusAlt />,
  };

  const icon: ReactNode = transportTypes[transportType.toLocaleLowerCase()];

  return (
    <div className={styles.column}>
      <span>{time}</span>

      <div className={styles["leg-line-wrapper"]}>
        {pathType === "departure" && (
          <FaRegDotCircle className={styles.icons} />
        )}
        {pathType === "leg" && <FaRandom />}
        {pathType === "arrival" && <FaMapMarkerAlt />}

        {pathType !== "arrival" && <div className={styles["leg-line"]} />}
      </div>
      {stationName && (
        <span className={styles["station-names"]}>{stationName}</span>
      )}
      {transportCode && <span>{icon ?? transportType}</span>}
      {transportCode && <span>{transportCode}</span>}
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
          pathType="departure"
          stationName={legs[0].origin}
          transportType={legs[0].type}
          transportCode={legs[0].categoryCode}
        />

        {legs &&
          legs?.length > 1 &&
          legs.map((leg, index) => {
            if (index < legs.length - 1)
              return (
                <LegPath
                  key={index}
                  time={getDayOrTime(leg.arrivalTime, "time")}
                  pathType="leg"
                  stationName={leg.destiny}
                  transportType={leg.type}
                  transportCode={leg.categoryCode}
                />
              );
          })}

        <LegPath
          time={arrivalTime}
          pathType="arrival"
          stationName={legs[destinyLenght - 1].destiny}
          transportType={legs[destinyLenght - 1].type}
          transportCode={legs[destinyLenght - 1].categoryCode}
        />
      </div>
    </div>
  );
}
