export type TrainApiResponse = {
  payload: {
    UICCode: string;
    namen: { lang: string };
    code: string;
  }[];
};

export type StationName = {
  stationCode: string;
  stationName: string;
  stationAbreviation: string;
};
