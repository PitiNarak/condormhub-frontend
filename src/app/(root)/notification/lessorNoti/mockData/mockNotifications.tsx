import {
  notiProposal,
  CompletedLeaseNoti,
} from '@/components/layout/RequestDetail';

export const LessorMockNotifications: (notiProposal | CompletedLeaseNoti)[] = [
  {
    requestId: '1',
    requestUser: 'User1',
    propName: 'Ideo1',
    proposal: "I'm homeless",
  },
  {
    requestUser: 'User7',
    propOwner: 'Piti',
    propName: 'Ideo7',
    date: '2025-03-11',
  },
  {
    requestId: '2',
    requestUser: 'User2',
    propName: 'Ideo2',
    proposal: 'Please I really want this place',
  },
  {
    requestId: '3',
    requestUser: 'User3',
    propName: 'Ideo3',
    proposal: 'Oh god please say yes',
  },
  {
    requestId: '4',
    requestUser: 'User4',
    propName: 'Ideo4',
    proposal: 'This deal is a steal',
  },
  {
    requestId: '5',
    requestUser: 'User5',
    propName: 'Ideo5',
    proposal: 'I want to open a restaurant',
  },
  {
    requestId: '6',
    requestUser: 'User6',
    propName: 'Ideo6',
    proposal: 'This would change my life',
  },
  {
    requestId: '7',
    requestUser: 'User7',
    propName: 'Ideo7',
    proposal: 'I need a place for my family',
  },
];
