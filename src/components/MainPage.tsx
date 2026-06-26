import ItineraryCard from "./ItineraryCard";
import styles from "./MainPage.module.css";
import TripProvider, { TripContext } from "./TripContext";

export default function MainPage() {
  return (
    <TripProvider>
      <div className={styles["main-page"]}>
        <ItineraryCard />
      </div>
    </TripProvider>
  );
}
