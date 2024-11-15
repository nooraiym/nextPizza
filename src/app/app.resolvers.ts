import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { Ingredient } from './shared/services/ingredients/ingredients.model';
import { IngredientsService } from './shared/services/ingredients/ingredients.service';
import { Product } from './shared/services/products/products.model';
import { ProductsService } from './shared/services/products/products.service';

export const productResolver: ResolveFn<Product> = (route) => {
  const productsService = inject(ProductsService);
  const productId = Number(route.paramMap.get('productId'));
  return productsService
    .getProducts({ id: productId })
    .pipe(map((products) => products[0]));
};

export const ingredientsResolver: ResolveFn<Ingredient[]> = () => {
  const ingredientsService = inject(IngredientsService);
  return ingredientsService.getAllIngredients();
};

export const recomendationsResolver: ResolveFn<Product[]> = () => {
  const productsService = inject(ProductsService);
  return productsService.getProducts({ recommendationsCount: 8 });
};
