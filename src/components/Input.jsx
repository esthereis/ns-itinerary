import { useState, useEffect } from "react";
import { func, string } from "prop-types";
import { getTrainInformation } from "../services/travel";
import styles from "./Input.module.css";

export default function Input({ placeholder, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [stationList, setStationList] = useState([]);
  const [searchable, setSearchable] = useState(false);

  useEffect(() => {
    if (!searchTerm && searchTerm < 2) {
      return;
    }
    getTrainInformation(searchTerm).then((data) => setStationList(data));
  }, [searchTerm, searchable]);

  return (
    <>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setSearchable(event.target.value.length >= 2);
        }}
        value={searchTerm ?? ""}
      />

      {searchable && (
        <ul className={styles["data-list"]}>
          {stationList?.map((station) => (
            <li
              key={station.UICCode}
              onClick={() => {
                setSearchTerm(station.namen.lang);
                setSearchable(false);
                onSelect(station);
              }}
            >
              {station.namen.lang}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

Input.propTypes = {
  placeholder: string.isRequired,
  onSelect: func.isRequired,
};
