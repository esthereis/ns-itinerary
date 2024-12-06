import MainCard from "./components/MainCard";
import TripProvider from "./components/TripContext";
import TripList from "./components/TripList";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.page}>
      <TripProvider>
        <MainCard />
        <TripList />
      </TripProvider>
    </div>
  );
}
