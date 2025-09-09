export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Rented' | 'Sold';
  type: string;
  postedDate: string;
  // Add more properties as needed
}

export interface PropertyDetails extends Property {
  description: string;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  amenities: string[];
  images: string[];
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  // Add more detailed properties as needed
}
