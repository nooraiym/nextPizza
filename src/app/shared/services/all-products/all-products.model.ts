export interface Product {
  id: number;
  name: string;
  new: true;
  ingredients: number[];
  tags: TagQuery[];
  description: string;
  imageUrl: string;
  price: number;
  weight: number;
  categoryId: number;
}
export type TagQuery =
  | 'all'
  | 'meaty'
  | 'spicy'
  | 'sweety'
  | 'vegeterian'
  | 'with-chicken'
  | 'with-seafood'
  | 'gluten-free'
  | 'cheesy'
  | 'dietary';
