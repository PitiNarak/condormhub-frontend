export type Student = {
  id: number;
  name: string;
  studentCard: string;
  reviewed: boolean;
  status?: 'Accepted' | 'Rejected';
};

export const studentData: Student[] = [
  {
    id: 1,
    name: 'John Doe',
    studentCard: '/fakeid.jpg',
    reviewed: false,
  },
  {
    id: 2,
    name: 'Jane Smith',
    studentCard: '/fakeid.jpg',
    reviewed: false,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    studentCard: '/fakeid.jpg',
    reviewed: true,
    status: 'Accepted',
  },
];
