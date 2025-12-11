export type TrainApiResponse = {
  payload: {
    UICCode: string;
    namen: { lang: string };
  }[];
};

export type Train = {
  trainCode: string;
  stationName: string;
};
