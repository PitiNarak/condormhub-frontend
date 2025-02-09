import {
  allLifestyleTags,
  LifestyleTag,
} from '@/app/lifestyle/allLifestyleTag';

export type PersonData = {
  id: number;
  name: string;
  lifestyleTags: LifestyleTag[];
};

export const mockPerson: PersonData = {
  id: 1,
  name: 'Keen',
  // For example, preselect tags with id 1 ("Active") and id 5 ("Creative")
  lifestyleTags: [
    allLifestyleTags.find((tag) => tag.id === 1)!,
    allLifestyleTags.find((tag) => tag.id === 5)!,
  ],
};
