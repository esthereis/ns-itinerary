import MainCard from "./components/MainCard";
import TripProvider from "./components/TripContext";
import TripList from "./components/TripList";
import styles from "./App.module.css";
import SelectedTrip from "./components/SelectedTrip";

export default function App() {
  return (
    <div className={styles.page}>
      <TripProvider>
        <MainCard />
        <TripList />
        <SelectedTrip />
      </TripProvider>
    </div>
  );
}
