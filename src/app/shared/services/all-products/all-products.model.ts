export interface Product {
  id: number;
  name: string;
  new: true;
  ingredients: number[];
  tags: number[];
  description: string;
  imageUrl: string;
  price: number;
  weight: number;
  categoryId: number;
}
