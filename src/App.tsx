import ItineraryFormCard from "./components/ItineraryFormCard";
import TripList from "./components/TripList";
import TripProvider from "./components/context/TripProvider";
import "./variables.css";

export default function App() {
  return (
    <div>
      <TripProvider>
        <ItineraryFormCard />
        {/* <MainCard /> */}
        <TripList />
      </TripProvider>
    </div>
  );
}
