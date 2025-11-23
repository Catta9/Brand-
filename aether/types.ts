export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  season: string;
  products: Product[];
}

export enum StylistMode {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  SUGGESTING = 'SUGGESTING',
  ERROR = 'ERROR'
}

export interface StylistResponse {
  outfitName: string;
  description: string;
  keyItems: string[];
  stylingTip: string;
}