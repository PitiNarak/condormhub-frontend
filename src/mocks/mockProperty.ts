import { components } from '@/types/api';

const a: components['schemas']['dto.DormResponseBody'] = {
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
  id: '1',
  name: 'name',
  owner: {
    birthDate: 'birthdate',
    email: 'email',
    filledPersonalInfo: true,
    firstname: 'firstname',
    gender: 'gender',
    id: 'id',
    isStudentVerified: true,
    isVerified: true,
    lastname: 'lastname',
    lifestyles: ['Active'],
    phoneNumber: 'phoneNumber',
    role: 'ADMIN',
    studentEvidence: 'studentEvidence',
    username: 'userName',
  },
  price: 9999,
  rating: 5,
  size: 0,
  updateAt: 'updateAt',
};

const b: components['schemas']['dto.DormResponseBody'] = {
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
  id: '6',
  name: 'name',
  owner: {
    birthDate: 'birthdate',
    email: 'email',
    filledPersonalInfo: true,
    firstname: 'firstname',
    gender: 'gender',
    id: 'id',
    isStudentVerified: true,
    isVerified: true,
    lastname: 'lastname',
    lifestyles: ['Active'],
    phoneNumber: 'phoneNumber',
    role: 'ADMIN',
    studentEvidence: 'studentEvidence',
    username: 'userName',
  },
  price: 9999,
  rating: 5,
  size: 0,
  updateAt: 'updateAt',
};

const mockArray = [a, b];

export const mockData = JSON.stringify(mockArray);
