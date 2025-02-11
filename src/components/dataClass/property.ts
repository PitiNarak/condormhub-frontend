export class Property {
  id = 0;
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
    id: number,
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
