import ItineraryFormCard from "./components/ItineraryFormCard";
import TripProvider from "./components/TripContext";
import TripList from "./components/TripList";
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
