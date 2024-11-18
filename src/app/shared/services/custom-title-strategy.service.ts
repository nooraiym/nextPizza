import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { ProductsService } from './products/products.service';

@Injectable({ providedIn: 'root' })
export class CustomTitleStrategy extends TitleStrategy {
  private titleService = inject(Title);
  private productsService = inject(ProductsService);

  constructor() {
    super();
  }

  async updateTitle(snapshot: RouterStateSnapshot): Promise<void> {
    const routeTitle = this.getStaticTitle(snapshot.root);

    if (routeTitle) {
      this.titleService.setTitle(routeTitle);
    } else {
      const productId = this.getRouteParam(snapshot.root, 'productId');
      if (productId) {
        const product = await firstValueFrom(
          this.productsService
            .getProducts({ id: +productId }, {})
            .pipe(map((data) => data[0].products))
        );
        const dynamicTitle = product
          ? `${product[0].name}`
          : 'Product not found';
        this.titleService.setTitle(dynamicTitle);
      } else {
        this.titleService.setTitle('Next Pizza');
      }
    }
  }

  private getStaticTitle(snapshot: ActivatedRouteSnapshot): string | null {
    if (snapshot.routeConfig && snapshot.routeConfig.title) {
      return snapshot.routeConfig.title as string;
    }

    for (const child of snapshot.children) {
      const childTitle = this.getStaticTitle(child);
      if (childTitle) {
        return childTitle;
      }
    }

    return null;
  }

  private getRouteParam(snapshot: any, param: string): string | null {
    if (snapshot.paramMap && snapshot.paramMap.has(param)) {
      return snapshot.paramMap.get(param);
    }

    for (const child of snapshot.children) {
      const result = this.getRouteParam(child, param);
      if (result) return result;
    }

    return null;
  }
}
