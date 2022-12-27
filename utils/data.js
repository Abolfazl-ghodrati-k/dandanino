import bcrypt from 'bcryptjs';

export const products = [
  // {
  //   name: "واترجت دندانینو",
  //   slug: "waterjet-dandanino",
  //   category: "Shirts",
  //   image: "/images/banner.jpeg",
  //   price: 2500000,
  //   brand: "dandanino",
  //   rating: 4.5,
  //   numReviews: 8,
  //   countInStock: 20,
  //   description: "بهترین مسواکه ناموسا",
  // },
  {
    name: "Fairywill-5020E",
    slug: "Fairywill-5020E",
    image: "/Images/banner.jpeg",
    price: 2500000,
    brand: "Fairywill",
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: "بهترین مسواکه ناموسا",
  },
  {
    name: "Fairywill-F30",
    slug: "Fairywill-F30",
    image: "/Images/banner.jpeg",
    price: 2500000,
    brand: "Fairywill",
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: "بهترین مسواکه ناموسا",
  },
  {
    name: "RevyLine-RL450",
    slug: "RevyLine-RL450",
    image: "/Images/banner.jpeg",
    price: 2500000,
    brand: "RevyLine",
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: "بهترین مسواکه ناموسا",
  },
];

export const users = [
  {
    name: "ابوالفضل قدرتی",
    username: "09020257735",
    password: bcrypt.hashSync("Tsolm!571080"),
    image: '',
    isAdmin: true,
  },
];
