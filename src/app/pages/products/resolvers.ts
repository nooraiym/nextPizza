import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from '../../shared/services/all-products/all-products.model';
import { AllProductsService } from '../../shared/services/all-products/all-products.service';
import { Ingredient } from '../../shared/services/ingredients/ingredients.model';
import { IngredientsService } from '../../shared/services/ingredients/ingredients.service';

export const productResolver: ResolveFn<Product> = (route) => {
  const allProductsService = inject(AllProductsService);
  const productId = Number(route.paramMap.get('productId'));
  return allProductsService.getProductById(productId);
};

export const ingredientsResolver: ResolveFn<Ingredient[]> = () => {
  const ingredientsService = inject(IngredientsService);
  return ingredientsService.getAllIngredients();
};

export const recomendationsResolver: ResolveFn<Product[]> = () => {
  const allProductsService = inject(AllProductsService);
  return allProductsService.getRandomRecommendations(8);
};
