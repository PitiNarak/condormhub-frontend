import { components } from '@/types/api';

const a: components['schemas']['domain.Dorm'] = {
  address: {
    district: 'district',
    province: 'province',
    subdistrict: 'subdistrict',
    zipcode: 'zipcode',
  },
  bathrooms: 0,
  bedrooms: 0,
  createAt: 'creatAt',
  description: 'description',
  id: 'id',
  name: 'name',
  owner: {
    birthDate: 'birthdate',
    createAt: 'createAt',
    email: 'email',
    filledPersonalInfo: true,
    firstname: 'firstname',
    gender: 'gender',
    id: 'id',
    isStudentVerified: true,
    isVerified: true,
    lastname: 'lastname',
    lifestyles: ['Active'],
    nationalID: 'nationanlID',
    phoneNumber: 'phoneNumber',
    role: 'ADMIN',
    studentEvidence: 'studentEvidence',
    updateAt: 'updateAt',
    username: 'userName',
  },
  ownerId: 'ownerID',
  price: 9999,
  rating: 5,
  size: 0,
  updateAt: 'updateAt',
};

const mockArray = [a];

export const mockData = JSON.stringify(mockArray);
