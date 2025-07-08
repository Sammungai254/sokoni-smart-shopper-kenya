export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  estimatedPrice?: number;
}

export interface Store {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  openingHours: {
    [key: string]: { open: string; close: string };
  };
  deliveryOptions: {
    available: boolean;
    fee: number;
    minimumOrder: number;
  };
  contactInfo: {
    phone: string;
    website?: string;
  };
}

export interface ItemPrice {
  storeId: string;
  itemName: string;
  price: number;
  inStock: boolean;
  lastUpdated: Date;
}

export interface ShoppingRecommendation {
  type: 'single' | 'split';
  stores: {
    storeId: string;
    items: ShoppingItem[];
    totalCost: number;
    transportCost: number;
    distance: number;
  }[];
  totalSavings: number;
  reasoning: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}