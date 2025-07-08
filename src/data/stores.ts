import { Store } from '@/types/shopping';

export const nairobiFamilyMart: Store[] = [
  {
    id: 'carrefour-sarit',
    name: 'Carrefour Sarit Centre',
    location: {
      lat: -1.2631,
      lng: 36.8009,
      address: 'Sarit Centre, Westlands, Nairobi'
    },
    openingHours: {
      monday: { open: '08:00', close: '22:00' },
      tuesday: { open: '08:00', close: '22:00' },
      wednesday: { open: '08:00', close: '22:00' },
      thursday: { open: '08:00', close: '22:00' },
      friday: { open: '08:00', close: '22:00' },
      saturday: { open: '08:00', close: '22:00' },
      sunday: { open: '08:00', close: '22:00' }
    },
    deliveryOptions: {
      available: true,
      fee: 300,
      minimumOrder: 2000
    },
    contactInfo: {
      phone: '+254 700 000 000',
      website: 'https://www.carrefourkenya.com'
    }
  },
  {
    id: 'naivas-junction',
    name: 'Naivas Junction Mall',
    location: {
      lat: -1.2983,
      lng: 36.7644,
      address: 'Junction Mall, Ngong Road, Nairobi'
    },
    openingHours: {
      monday: { open: '08:00', close: '21:30' },
      tuesday: { open: '08:00', close: '21:30' },
      wednesday: { open: '08:00', close: '21:30' },
      thursday: { open: '08:00', close: '21:30' },
      friday: { open: '08:00', close: '21:30' },
      saturday: { open: '08:00', close: '21:30' },
      sunday: { open: '08:00', close: '21:30' }
    },
    deliveryOptions: {
      available: true,
      fee: 250,
      minimumOrder: 1500
    },
    contactInfo: {
      phone: '+254 711 039 000'
    }
  },
  {
    id: 'quickmart-yaya',
    name: 'Quickmart Yaya Centre',
    location: {
      lat: -1.2920,
      lng: 36.7808,
      address: 'Yaya Centre, Kilimani, Nairobi'
    },
    openingHours: {
      monday: { open: '08:00', close: '22:00' },
      tuesday: { open: '08:00', close: '22:00' },
      wednesday: { open: '08:00', close: '22:00' },
      thursday: { open: '08:00', close: '22:00' },
      friday: { open: '08:00', close: '22:00' },
      saturday: { open: '08:00', close: '22:00' },
      sunday: { open: '08:00', close: '22:00' }
    },
    deliveryOptions: {
      available: true,
      fee: 200,
      minimumOrder: 1000
    },
    contactInfo: {
      phone: '+254 700 100 200'
    }
  },
  {
    id: 'cleanshelf-westgate',
    name: 'Cleanshelf Westgate',
    location: {
      lat: -1.2667,
      lng: 36.8063,
      address: 'Westgate Shopping Mall, Westlands, Nairobi'
    },
    openingHours: {
      monday: { open: '09:00', close: '21:00' },
      tuesday: { open: '09:00', close: '21:00' },
      wednesday: { open: '09:00', close: '21:00' },
      thursday: { open: '09:00', close: '21:00' },
      friday: { open: '09:00', close: '21:00' },
      saturday: { open: '09:00', close: '21:00' },
      sunday: { open: '09:00', close: '21:00' }
    },
    deliveryOptions: {
      available: false,
      fee: 0,
      minimumOrder: 0
    },
    contactInfo: {
      phone: '+254 722 000 000'
    }
  }
];