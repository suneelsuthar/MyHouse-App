import { Images } from "../assets/Images";

export type IForYou = {
  id: number;
  title: string;
  liked: boolean;
  image: any;
};

export type ITopRated = {
  id: number;
  title: string;
  subtitle: string;
  liked: boolean;
  image: any;
  price: number;
  noOfBeds: number;
  noOfguests: number;
};

export type ITrend = {
  id: number;
  title: string;
  liked: boolean;
  image: any;
};

export type ISpecialOffer = ITopRated & {
  description: string;
};

export const user = {
  username: "Suneel Kumar",
  firstName: "Suneel",
  lastName: "Kumar",
  email: "suneelsuther@gmail.com",
};

export type IUsers = {
  id: number;
  name: string;
  info: string;
  image: string;
  age: number;
  address: string;
  email: string;
};

const forYouList: IForYou[] = [
  {
    id: 0,
    title: "24/7Electricity",
    liked: false,
    image: require("../assets/dummyimages/foryou1.jpg"),
  },
  {
    id: 1,
    title: "Chef",
    liked: false,
    image: require("../assets/dummyimages/foryou2.png"),
  },
];

const topratedList: ITopRated[] = [
  {
    id: 0,
    title: "2 Bedroom Apartment",
    subtitle: "Shortlet",
    liked: false,
    image: require("../assets/dummyimages/toprated1.png"),
    price: 150,
    noOfBeds: 2,
    noOfguests: 7,
  },

  {
    id: 0,
    title: "2 Bedroom Apartment",
    subtitle: "Shortlet",
    liked: false,
    image: require("../assets/dummyimages/toprated2.jpg"),
    price: 150,
    noOfBeds: 2,
    noOfguests: 7,
  },
];

const sepecialOfferList: ISpecialOffer[] = [
  {
    id: 0,
    title: "2 Bedroom Apartment",
    subtitle: "Shortlet",
    description:
      "Book our luxury villa for 2 days and get stay of 1 more night for free",
    liked: false,
    image: require("../assets/dummyimages/offer1.png"),
    price: 150000,
    noOfBeds: 2,
    noOfguests: 7,
  },
  {
    id: 1,
    title: "2 Bedroom Apartment",
    subtitle: "Shortlet",
    description:
      "Book our luxury villa for 2 days and get stay of 1 more night for free",
    liked: false,
    image: require("../assets/dummyimages/offer2.png"),
    price: 15000,
    noOfBeds: 2,
    noOfguests: 7,
  },
  {
    id: 1,
    title: "2 Bedroom Apartment",
    subtitle: "Shortlet",
    description:
      "Book our luxury villa for 2 days and get stay of 1 more night for free",
    liked: false,
    image: require("../assets/dummyimages/offer3.png"),
    price: 15000,
    noOfBeds: 2,
    noOfguests: 7,
  },
];

const trendingList: ITrend[] = [
  {
    id: 0,
    title: "Maisonette",
    liked: false,
    image: require("../assets/dummyimages/trend1.png"),
  },

  {
    id: 1,
    title: "Maisonette",
    liked: false,
    image: require("../assets/dummyimages/trend2.png"),
  },
  {
    id: 2,
    title: "Maisonette",
    liked: false,
    image: require("../assets/dummyimages/trend3.png"),
  },
];

export { forYouList, topratedList, sepecialOfferList, trendingList };
