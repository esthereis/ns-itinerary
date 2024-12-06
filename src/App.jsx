import MainCard from "./components/sections/MainCard";
import TripProvider from "./components/sections/TripContext";
import TripList from "./components/sections/TripList";

export default function App() {
  return (
    <div>
      <TripProvider>
        <MainCard />
        <TripList />
      </TripProvider>
    </div>
  );
}
