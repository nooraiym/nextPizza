import { Ingredient } from '../services/ingredients/ingredients.model';
import { OrderDescription } from '../services/orders/orders.model';

export function formatOrderDescription(
  orderDescription: OrderDescription
): string {
  const sizeMapping: { [key: string]: string } = {
    '25': 'Маленькая',
    '30': 'Средняя',
    '35': 'Большая',
  };

  const crustMapping: { [key: string]: string } = {
    traditional: 'традиционное тесто',
    thin: 'тонкое тесто',
  };

  const size = sizeMapping[orderDescription.size] || 'Неизвестный размер';
  const crust = crustMapping[orderDescription.crust] || 'Неизвестный тип теста';

  return `${size} ${orderDescription.size} см, ${crust}`;
}

export function formatExtraOptions(extraOptions: Ingredient[]): string {
  if (!extraOptions || extraOptions.length === 0) {
    return '';
  }

  const formattedOptions = extraOptions
    .map((option) => option.name.toLowerCase())
    .join(', ');
  return `+ ${formattedOptions}`;
}

export function formatProductsCount(count: number): string {
  if (count === 1) {
    return 'продукт';
  }

  if (count >= 2 && count <= 4) {
    return 'продукта';
  }

  return 'продуктов';
}
