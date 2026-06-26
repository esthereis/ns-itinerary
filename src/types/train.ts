export type TrainApiResponse = {
  payload: {
    UICCode: string;
    namen: { lang: string };
    code: string;
  }[];
};

export type Station = {
  stationCode: string;
  stationName: string;
  stationAbreviation: string;
};
