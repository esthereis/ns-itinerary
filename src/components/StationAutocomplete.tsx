import { useEffect, useState } from "react";
import { getTrainInformation } from "../services/travel";
import { Train } from "../types/train";
import themeStyles from "./InputTheme.module.css";
import styles from "./StationAutocomplete.module.css";

type Props = {
  placeholder: string;
  onSelect: (trainCode: string) => void;
};

export default function StationAutocomplete({ placeholder, onSelect }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [stationList, setStationList] = useState<Train[] | undefined>([]);
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
        className={`${styles.input} ${themeStyles.inputTheme}`}
        type="text"
        placeholder={placeholder}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setSearchable(event.target.value.length >= 2);
        }}
        value={searchTerm ?? ""}
      />

      {searchable && (
        <ul className={styles.dataList}>
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
