export type TrainApiResponse = {
  payload: {
    UICCode: string;
    namen: { lang: string };
    code: string;
  }[];
};

export type TrainResponse = {
  trainCode: string;
  stationName: string;
  trainAbreviation: string;
};
