export interface Product {
  id: number;
  name: string;
  new: true;
  ingredients: number[];
  tags: string[];
  description: string;
  imageUrl: string;
  price: number;
  weight: number;
  category: string;
}
export interface ProductGroup {
  category: string;
  name: string;
  products: Product[];
}
