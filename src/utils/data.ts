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
  mandate: string;
  category: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pricePerNight: number;
  cautionDeposit: number;
  serviceChargeFlat: number;
  otherFeesFlat: number;
  description: string;
  virtualTourUrl?: string;
  features: string[];
  amenities: string[];
  quantity: number;
  rating: number;
  reviewsCount: number;
  agents: {
    id: string;
    name: string;
    avatar: string;
    code: string;
    role: "Primary agent" | "Agent";
  }[];
  facilityManagers: {
    id: string;
    name: string;
    avatar: string;
    code: string;
    role: "Facility Manager";
  }[];
  inspectionNotes: string;
};

const getRandomStatus = (): PropertyStatus =>
  ["Approved", "Pending", "Rejected"][
    faker.number.int({ min: 0, max: 2 })
  ] as PropertyStatus;

export const rentalProperties: IRentalProperty[] = Array.from({
  length: 8,
}).map((_, idx) => {
  const seedBase = faker.string.alphanumeric(8);
  // Always 5 stable images per property, using Picsum seeds so URLs are valid
  const images = Array.from({ length: 5 }).map(
    (__, i) =>
      `https://picsum.photos/seed/${encodeURIComponent(
        seedBase + "-house-" + i
      )}/640/420`
  );

  const name = `${faker.word.adjective()} ${faker.word.noun({
    length: 5,
  })}`.replace(/\b\w/g, (c) => c.toUpperCase());

  const city = faker.location.city();
  const country = faker.location.country();
  const rating = faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 });
  const reviews = faker.number.int({ min: 3, max: 120 });

  const agents = Array.from({
    length: faker.number.int({ min: 3, max: 6 }),
  }).map((__, i) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatar: `https://i.pravatar.cc/150?img=${faker.number.int({
      min: 1,
      max: 70,
    })}`,
    code: faker.number.int({ min: 10000, max: 99999 }).toString(),
    role: i === 0 ? ("Primary agent" as const) : ("Agent" as const),
  }));

  const facilityManagers = Array.from({
    length: faker.number.int({ min: 3, max: 6 }),
  }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatar: `https://i.pravatar.cc/150?img=${faker.number.int({
      min: 1,
      max: 70,
    })}`,
    code: faker.number.int({ min: 10000, max: 99999 }).toString(),
    role: "Facility Manager" as const,
  }));

  // Use sequential IDs starting from 1
  const propertyId = (idx + 1).toString().padStart(6, '0');
  
  return {
    id: propertyId, // Using the same ID for both id and propertyId for consistency
    name: name || `Property ${idx + 1}`,
    group: `${faker.company.name()} Group`,
    location: `${city}, ${country}`,
    status: getRandomStatus(),
    tenantName: faker.person.fullName(),
    propertyId: `PROP${propertyId}`,
    addedBy: faker.number.int({ min: 1200, max: 1299 }).toString(),
    images,
    mandate: faker.helpers.arrayElement([
      "Exclusive",
      "Non-exclusive",
      "Joint",
    ]),
    category: faker.helpers.arrayElement([
      "Shortlet",
      "Apartment",
      "Villa",
      "Maisonette",
    ]),
    address: faker.location.streetAddress(),
    city,
    state: faker.location.state(),
    country,
    pricePerNight: faker.number.int({ min: 80, max: 800 }),
    cautionDeposit: faker.number.int({ min: 100, max: 1000 }),
    serviceChargeFlat: faker.number.int({ min: 10, max: 200 }),
    otherFeesFlat: faker.number.int({ min: 0, max: 150 }),
    description: faker.lorem.paragraphs({ min: 1, max: 2 }),
    virtualTourUrl: faker.internet.url(),
    features: faker.helpers.arrayElements(
      ["Pool", "Gym", "WiFi", "Air Conditioning", "Parking", "Kitchen"],
      4
    ),
    amenities: faker.helpers.arrayElements(
      ["Towels", "Toiletries", "Smart TV", "Washer", "Dryer", "Workspace"],
      4
    ),
    quantity: faker.number.int({ min: 1, max: 10 }),
    rating,
    reviewsCount: reviews,
    agents,
    facilityManagers,
    inspectionNotes: faker.lorem.sentences({ min: 2, max: 4 }),
  } as IRentalProperty;
});
export interface IFacilityManagement {
  id: string;
  images: string[];
  requestedBy: string;
  status: "Work Requests" | "Orders" | "Completed";
  title: string;
  text: string;
  workReqNo: string;
  category: string;
  priority: string;
  issueDate: string;
  dueDate: string;
}


const SERVICE_MOCK_DATA = [
  { id: 0, title: "Swimming pool", image: Images.pool },
  { id: 1, title: "Tennis Court", image: Images.tennis },
  { id: 2, title: "Gym", image: Images.gym },
  { id: 3, title: "Playground", image: Images.playground },
  { id: 4, title: "Basketball Court", image: Images.basketball },
  { id: 5, title: "Swimming pool", image: Images.pool },
  { id: 6, title: "Tennis Court", image: Images.tennis },
  { id: 7, title: "Gym", image: Images.gym },
  { id: 8, title: "Playground", image: Images.playground },
  { id: 9, title: "Basketball Court", image: Images.basketball },
  { id: 10, title: "Swimming pool", image: Images.pool },
  { id: 11, title: "Tennis Court", image: Images.tennis },
  { id: 12, title: "Gym", image: Images.gym },
  { id: 13, title: "Playground", image: Images.playground },
  { id: 14, title: "Basketball Court", image: Images.basketball },
];


const INSEPECTION_MOCK_DATA = [
  {
    id: 1,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "pending",
    alert: "Kidnap",
    avatar: "E",
    backgroundColor: "#E8E8E8",
    textColor: "#333",
    address: "Lahore, Punjab , Pakistan",
  },
  {
    id: 2,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "approved",
    alert: "Kidnap",
    avatar: "B",
    backgroundColor: "#292766",
    textColor: "#FFF",
    address: "Lahore, Punjab , Pakistan",
  },
  {
    id: 3,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "rejected",
    alert: "Kidnap",
    avatar: "E",
    backgroundColor: "#E8E8E8",
    textColor: "#333",
    address: "Lahore, Punjab , Pakistan",
  },
  {
    id: 4,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "pending",
    alert: "Kidnap",
    avatar: "B",
    backgroundColor: "#292766",
    textColor: "#FFF",
    address: "Lahore, Punjab , Pakistan",
  },
  {
    id: 5,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "rejected",
    alert: "pending",
    avatar: "E",
    backgroundColor: "#E8E8E8",
    textColor: "#333",
    address: "Lahore, Punjab , Pakistan",
  },
  {
    id: 6,
    name: "Jane Smith",
    property: "Greenwood Apartments",
    status: "pending",
    alert: "Kidnap",
    avatar: "B",
    backgroundColor: "#292766",
    textColor: "#FFF",
    address: "Lahore, Punjab , Pakistan",
  },
];

export {
  forYouList,
  topratedList,
  sepecialOfferList,
  trendingList,
  rentalProperties,
  IRentalProperty,
  IFacilityManagement,
  SERVICE_MOCK_DATA,
  INSEPECTION_MOCK_DATA
};
