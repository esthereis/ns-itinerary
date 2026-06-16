import MainCard from "./components/MainCard";
import TripProvider from "./components/TripContext";
import TripList from "./components/TripList";
import styles from "./App.module.css";
import ItineraryCard from "./components/ItineraryCard";

export default function App() {
  return (
    <div className={styles.page}>
      <TripProvider>
        <ItineraryCard
          departureList={["example1", "example2", "example3"]}
          arrivalList={["example1", "example2", "example3"]}
        />
        <MainCard />
        <TripList />
      </TripProvider>
    </div>
  );
}
