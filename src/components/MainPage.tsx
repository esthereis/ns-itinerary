import ItineraryCard from "./ItineraryCard";
import styles from "./MainPage.module.css";
import TripProvider from "./TripContext";
import TripResume from "./TripResume";
import TripsContainer from "./TripsContainer";

export default function MainPage() {
  return (
    <TripProvider>
      <div className={styles["main-page"]}>
        <ItineraryCard />

        <div className={styles["trips-wrapper"]}>
          <TripsContainer />
          <TripResume />
        </div>
      </div>
    </TripProvider>
  );
}
