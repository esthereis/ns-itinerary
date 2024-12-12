import { useState, useEffect } from "react";
import { getTrainInformation } from "../services/travel";
import styles from "./Input.module.css";
import { TrainResponse } from "../types/train";

type Props = {
  placeholder: string;
  onSelect: (trainCode: string) => void;
};

export default function Input({ placeholder, onSelect }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [stationList, setStationList] = useState<TrainResponse[] | undefined>(
    []
  );
  const [searchable, setSearchable] = useState(false);

  useEffect(() => {
    if (!searchTerm && searchTerm.length < 2) {
      return;
    }
    getTrainInformation(searchTerm).then((trainResponse) => {
      setStationList(trainResponse);
    });
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
              key={station.trainCode}
              onClick={() => {
                setSearchTerm(station.stationName);
                setSearchable(false);
                onSelect(station.trainCode);
              }}
            >
              {station.stationName}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
