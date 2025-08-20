import { Images } from "../assets/Images";
import { faker } from "@faker-js/faker";

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

// Admin Manage Properties
export type PropertyStatus = "Approved" | "Pending" | "Rejected";

export type IRentalProperty = {
  id: string;
  name: string; // e.g., Brume Villa
  group: string; // e.g., Brume Group
  location: string; // City, Country
  status: PropertyStatus;
  tenantName?: string;
  propertyId: string;
  addedBy: string;
  images: string[]; // generated via faker
};

const getRandomStatus = (): PropertyStatus =>
  (["Approved", "Pending", "Rejected"][faker.number.int({ min: 0, max: 2 })] as PropertyStatus);

export const rentalProperties: IRentalProperty[] = Array.from({ length: 8 }).map(
  (_, idx) => {
    const seedBase = faker.string.alphanumeric(8);
    // Always 5 stable images per property, using Picsum seeds so URLs are valid
    const images = Array.from({ length: 5 }).map((__, i) =>
      `https://picsum.photos/seed/${encodeURIComponent(seedBase + "-house-" + i)}/640/420`
    );

    const name = `${faker.word.adjective()} ${faker.word.noun({ length: 5 })}`
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      id: faker.string.uuid(),
      name: name || `Property ${idx + 1}`,
      group: `${faker.company.name()} Group`,
      location: `${faker.location.city()}, ${faker.location.country()}`,
      status: getRandomStatus(),
      tenantName: faker.person.fullName(),
      propertyId: faker.number.int({ min: 100000, max: 999999 }).toString(),
      addedBy: faker.number.int({ min: 1200, max: 1299 }).toString(),
      images,
    } as IRentalProperty;
  }
);

export { forYouList, topratedList, sepecialOfferList, trendingList, rentalProperties, IRentalProperty };
