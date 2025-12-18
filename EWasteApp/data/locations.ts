export type EwasteLocation = {
  id: string;
  name: string;
  address: string;
  services: string;
  acceptedItems: string[];
  distance: string;
  latitude: number;
  longitude: number;
};

export const SAMPLE_LOCATIONS: EwasteLocation[] = [
  {
    id: 'greentech',
    name: 'GreenTech Recycling Center',
    address: '1234 Environmental Ave, San Francisco, CA',
    services: 'Recycling, Donation, Buy Back',
    acceptedItems: ['Mobile Phones', 'Laptops', 'Batteries', 'Monitors'],
    distance: '2.3 km away',
    latitude: 37.77926,
    longitude: -122.4192,
  },
  {
    id: 'ecodrop',
    name: 'EcoDrop Mobile Collection',
    address: '5678 Green Street, San Francisco, CA',
    services: 'Pickup, Drop-off',
    acceptedItems: ['Mobile Phones', 'Laptops', 'Batteries'],
    distance: '1.8 km away',
    latitude: 37.7719,
    longitude: -122.4312,
  },
  {
    id: 'techrepair',
    name: 'TechRepair Plus',
    address: '9012 Tech Boulevard, San Francisco, CA',
    services: 'Repair, Recycling, Buy Back',
    acceptedItems: ['Laptops', 'Monitors'],
    distance: '3.1 km away',
    latitude: 37.7885,
    longitude: -122.4075,
  },
];


