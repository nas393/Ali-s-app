import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'small-pack',
    title: 'Small Pack',
    price: 1000,
    currency: 'KZ',
    image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?q=80&w=800&auto=format&fit=crop', 
    description: 'A curated selection of 5 magical mini-stickers. Perfect for potion bottles and phone cases.',
  },
  {
    id: 'half-a4',
    title: 'Half A4 Sheet',
    price: 3000,
    currency: 'KZ',
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?q=80&w=800&auto=format&fit=crop', 
    description: 'Over 15 enchanted designs on a high-quality vinyl half-sheet. Ideal for grimoures and laptops.',
    popular: true,
  },
  {
    id: 'full-a4',
    title: 'Full A4 Sheet',
    price: 5000,
    currency: 'KZ',
    image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop', 
    description: 'The ultimate collection. 30+ stickers covering all magical faculties. Best value for wizards.',
  },
];

export const WHATSAPP_NUMBER = "96181030754"; 
export const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1505664063603-28e48ca204eb?q=80&w=2070&auto=format&fit=crop";