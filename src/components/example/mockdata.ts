class Property {
  id = 0;
  image = '';
  owner = '';
  rating = 0;
  bedroom = 0;
  bathroom = 0;
  province = '';
  district = '';
  price = 0;
  constructor(
    id: number,
    image: string,
    owner: string,
    rating: number,
    bedroom: number,
    bathroom: number,
    province: string,
    district: string,
    price: number
  ) {
    this.id = id;
    this.image = image;
    this.owner = owner;
    this.rating = rating;
    this.bedroom = bedroom;
    this.bathroom = bathroom;
    this.province = province;
    this.district = district;
    this.price = price;
  }
}
export const mockData = [
  new Property(
    1,
    '/image.jpeg',
    'Piti',
    4.9,
    2,
    2,
    'Bangkok',
    'Pathumwan',
    15000
  ),
  new Property(
    2,
    '/image.jpeg',
    'Piti1',
    4.8,
    1,
    3,
    'Bangkok',
    'Pathumwan',
    10000
  ),
  new Property(
    3,
    '/image.jpeg',
    'Piti2',
    4.5,
    10,
    3,
    'Bangkok',
    'Pathumwan',
    20000
  ),
  new Property(
    4,
    '/image.jpeg',
    'Piti3',
    4.6,
    7,
    12,
    'Bangkok',
    'Pathumwan',
    200000
  ),
  new Property(
    5,
    '/image.jpeg',
    'Piti5',
    4.8,
    9,
    11,
    'Bangkok',
    'Pathumwan',
    45000
  ),
];
