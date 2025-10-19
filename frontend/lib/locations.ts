// lib/locations.ts

export interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  city: string;
  postalCode: string;
  lat: number;
  lng: number;
}

export const locations: Location[] = [
  {
    id: 1,
    name: "Lawrence Square",
    address: "2086 Lawrence Ave W, Unit 05, Toronto, ON M9N 3Z9",
    phone: "647-219-8381",
    city: "Toronto",
    postalCode: "M9N 3Z9",
    lat: 43.7091,
    lng: -79.5156
  },
  {
    id: 2,
    name: "Downtown Toronto",
    address: "123 King St W, Toronto, ON M5H 1A1",
    phone: "416-555-0100",
    city: "Toronto",
    postalCode: "M5H 1A1",
    lat: 43.6488,
    lng: -79.3838
  },
  // TODO: Add your other 13 locations here
  // Go to https://www.latlong.net/ and paste each address to get lat/lng
];