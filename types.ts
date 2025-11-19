export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  popular?: boolean;
}

export interface StickerIdea {
  title: string;
  description: string;
  visualCues: string;
}

export enum ViewState {
  SHOP = 'SHOP',
  ORACLE = 'ORACLE'
}