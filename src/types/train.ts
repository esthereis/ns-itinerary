export type TrainApiResponse = {
  payload: {
    UICCode: string;
    namen: { lang: string };
  }[];
};

export type TrainResponse = {
  trainCode: string;
  stationName: string;
};
