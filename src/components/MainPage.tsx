import ItineraryCard from "./ItineraryCard";
import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={styles["main-page"]}>
      <ItineraryCard
        departureList={["example1", "example2", "example3"]}
        arrivalList={["example1", "example2", "example3"]}
      />
    </div>
  );
}
