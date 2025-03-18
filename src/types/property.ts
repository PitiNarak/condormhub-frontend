export class Property {
  id = '';
  image = '';
  rating = 0;
  bedroom = 0;
  bathroom = 0;
  province = '';
  district = '';
  price = 0;
  propertyName = '';
  owner = '';
  size = 0;
  description = '';
  constructor(
    id: string,
    image: string,
    rating: number,
    bedroom: number,
    bathroom: number,
    province: string,
    district: string,
    price: number,
    propertyName: string,
    owner: string,
    size: number,
    description: string
  ) {
    this.id = id;
    this.image = image;
    this.rating = rating;
    this.bedroom = bedroom;
    this.bathroom = bathroom;
    this.province = province;
    this.district = district;
    this.price = price;
    this.propertyName = propertyName;
    this.owner = owner;
    this.size = size;
    this.description = description;
  }
}

export interface PropertyI {
  id: string;
  image: string;
  rating: number;
  bedroom: number;
  bathroom: number;
  province: string;
  district: string;
  price: number;
  propertyName: string;
  owner: string;
  size: number;
  description: string;
}

export interface MiniPropertyI {
  image: string;
  rating: number;
  bedroom: number;
  bathroom: number;
  propertyName: string;
  province: string;
  district: string;
  price: number;
}

interface address {
  district: string;
  privince: string;
  subdistrict: string;
  zipcode: string;
}
interface owner {
  // id: string;
  // username: string;
  birthDate: string;
  createAt: string;
  email: string;
  filledPersonalInfo: boolean;
  firstname: string;
  gender: string;
  id: string;
  isStudentVerified: boolean;
  isVerified: boolean;
  lastname: string;
  lifestyles: string[];
  nationalID: string;
  phoneNumber: string;
  role: string;
  studentEvidence: string;
  updateAt: string;
  username: string;
}

export interface propertyBackend {
  address: address;
  bathrooms: number;
  bedroom: number;
  createAt: string;
  description: string;
  id: string;
  name: string;
  owner: owner;
  price: number;
  rating: number;
  size: number;
  ownerId: string;
  updateAt: string;
}
