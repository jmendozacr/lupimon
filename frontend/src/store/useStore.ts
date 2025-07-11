import { create } from 'zustand';

// Tipos para el estado
interface DogPhoto {
  file: File | null;
  preview: string | null;
}

interface ArtStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

interface GeneratedArt {
  id: string;
  imageUrl: string;
  style: string;
  prompt: string;
  selected: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'shirt' | 'mug' | 'tote' | 'sticker';
}

interface CartItem {
  product: Product;
  selectedArt: GeneratedArt | null;
  quantity: number;
}

// Estado global
interface LupimonStore {
  // Foto del perro
  dogPhoto: DogPhoto;
  setDogPhoto: (file: File) => void;
  clearDogPhoto: () => void;

  // Estilos disponibles
  artStyles: ArtStyle[];
  selectedStyle: string | null;
  setSelectedStyle: (styleId: string) => void;

  // Arte generado
  generatedArts: GeneratedArt[];
  setGeneratedArts: (arts: GeneratedArt[]) => void;
  selectGeneratedArt: (artId: string) => void;
  clearGeneratedArts: () => void;

  // Productos
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;

  // Carrito
  cart: CartItem[];
  addToCart: (product: Product, art: GeneratedArt | null) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Estado de carga
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Errores
  error: string | null;
  setError: (error: string | null) => void;
}

// Estilos predefinidos
const defaultArtStyles: ArtStyle[] = [
  {
    id: 'cartoon',
    name: 'Caricatura',
    description: 'Estilo divertido y colorido',
    prompt: 'A cute cartoon illustration of a dachshund dog, front view, bright colors, vector style, clean lines, white background'
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Estilo japonés con ojos expresivos',
    prompt: 'Anime-style portrait of a dachshund dog, big expressive eyes, soft colors, pastel background, highly detailed'
  },
  {
    id: 'digital',
    name: 'Digital Clásico',
    description: 'Pintura digital realista',
    prompt: 'Digital painting of a dachshund dog, realistic but stylized, soft shadows, minimal background, high quality'
  }
];

// Productos predefinidos
const defaultProducts: Product[] = [
  {
    id: 'shirt-1',
    name: 'Camiseta Básica',
    price: 25,
    image: '/mockups/shirt-basic.jpg',
    category: 'shirt'
  },
  {
    id: 'mug-1',
    name: 'Taza Personalizada',
    price: 15,
    image: '/mockups/mug-basic.jpg',
    category: 'mug'
  },
  {
    id: 'tote-1',
    name: 'Tote Bag',
    price: 20,
    image: '/mockups/tote-basic.jpg',
    category: 'tote'
  }
];

// Store principal
export const useLupimonStore = create<LupimonStore>((set, get) => ({
  // Estado inicial
  dogPhoto: { file: null, preview: null },
  artStyles: defaultArtStyles,
  selectedStyle: null,
  generatedArts: [],
  products: defaultProducts,
  selectedProduct: null,
  cart: [],
  isLoading: false,
  error: null,

  // Acciones para foto del perro
  setDogPhoto: (file: File) => {
    const preview = URL.createObjectURL(file);
    set({ dogPhoto: { file, preview } });
  },

  clearDogPhoto: () => {
    const { dogPhoto } = get();
    if (dogPhoto.preview) {
      URL.revokeObjectURL(dogPhoto.preview);
    }
    set({ dogPhoto: { file: null, preview: null } });
  },

  // Acciones para estilos
  setSelectedStyle: (styleId: string) => {
    set({ selectedStyle: styleId });
  },

  // Acciones para arte generado
  setGeneratedArts: (arts: GeneratedArt[]) => {
    set({ generatedArts: arts });
  },

  selectGeneratedArt: (artId: string) => {
    const { generatedArts } = get();
    const updatedArts = generatedArts.map(art => ({
      ...art,
      selected: art.id === artId
    }));
    set({ generatedArts: updatedArts });
  },

  clearGeneratedArts: () => {
    set({ generatedArts: [] });
  },

  // Acciones para productos
  setSelectedProduct: (product: Product) => {
    set({ selectedProduct: product });
  },

  // Acciones para carrito
  addToCart: (product: Product, art: GeneratedArt | null) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({ cart: updatedCart });
    } else {
      set({ cart: [...cart, { product, selectedArt: art, quantity: 1 }] });
    }
  },

  removeFromCart: (productId: string) => {
    const { cart } = get();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    set({ cart: updatedCart });
  },

  updateCartQuantity: (productId: string, quantity: number) => {
    const { cart } = get();
    const updatedCart = cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    ).filter(item => item.quantity > 0);
    set({ cart: updatedCart });
  },

  clearCart: () => {
    set({ cart: [] });
  },

  // Acciones para estado de carga
  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  // Acciones para errores
  setError: (error: string | null) => {
    set({ error });
  }
}));

// Selectores útiles
export const useDogPhoto = () => useLupimonStore(state => state.dogPhoto);
export const useArtStyles = () => useLupimonStore(state => state.artStyles);
export const useSelectedStyle = () => useLupimonStore(state => state.selectedStyle);
export const useGeneratedArts = () => useLupimonStore(state => state.generatedArts);
export const useProducts = () => useLupimonStore(state => state.products);
export const useSelectedProduct = () => useLupimonStore(state => state.selectedProduct);
export const useCart = () => useLupimonStore(state => state.cart);
export const useIsLoading = () => useLupimonStore(state => state.isLoading);
export const useError = () => useLupimonStore(state => state.error);
