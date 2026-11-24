export type CategoryId =
  | 'all'
  | 'warzywa-owoce'
  | 'ziarna-maki'
  | 'miody-przetwory'
  | 'nabial-fermenty'
  | 'oleje-ziola';

export type PageId = 'catalog' | 'contact';

export type DensityMode = 'comfortable' | 'high';

export type ThemeMode = 'light' | 'dark';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export type HighDensityLayout = 'grid' | 'table';

export type IllustrationKey =
  | 'tomatoes'
  | 'radish'
  | 'mushrooms'
  | 'flour'
  | 'oats'
  | 'honey'
  | 'rosehip'
  | 'cheese'
  | 'beetkvass'
  | 'sauerkraut'
  | 'flaxoil'
  | 'herbaltea';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  origin: string;
  producer: string;
  weight: string;
  price: number;
  pricePerUnit: string;
  certCode: string;
  harvestNote: string;
  description: string;
  inStock: boolean;
  isSeasonal?: boolean;
  illustrationKey: IllustrationKey;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ContactSubmission {
  referenceId: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  preferredReply: 'email' | 'phone';
  message: string;
}
