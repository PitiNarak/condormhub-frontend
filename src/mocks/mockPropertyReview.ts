export type Review = {
  rate: number;
  message: string;
  url: string[];
};

export const mockReview: Review[] = [
  {
    rate: 2,
    message:
      'Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm Bad Dorm',
    url: [],
  },
  {
    rate: 1,
    message: 'Terrible Dorm',
    url: [],
  },
  {
    rate: 2,
    message: 'I hate this place so much',
    url: [],
  },
  {
    rate: 2,
    message: 'I hate this place so much',
    url: [],
  },
  {
    rate: 2,
    message: 'I hate this place so much',
    url: [],
  },
  {
    rate: 2,
    message: 'I hate this place so much',
    url: [],
  },
];
