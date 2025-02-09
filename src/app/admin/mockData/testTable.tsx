export type Student = {
  id: number;
  name: string;
  studentCard: string;
  reviewed: boolean;
  status?: 'Accepted' | 'Rejected';
  reviewDate?: string;
};

export const studentData: Student[] = [
  {
    id: 1,
    name: 'Peaw',
    studentCard: '/fakeid2.jpg',
    reviewed: false,
  },
  {
    id: 2,
    name: 'Keen',
    studentCard: '/fakeid3.jpg',
    reviewed: false,
  },
  {
    id: 3,
    name: 'Bright',
    studentCard: '/fakeid.jpg',
    reviewed: true,
    status: 'Accepted',
    reviewDate: '2025-02-05T14:00:00.000Z',
  },
];
