import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { products } from '../../../mock/products';
import { FilteringByNewestComponent } from '../../shared/components/filtering/filtering.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SelectionComponent } from '../../shared/components/selection/selection.component';
import { SidemenuComponent } from '../../shared/components/sidemenu/sidemenu.component';
import { ContainerDirective } from '../../shared/directives/container.directive';
import { PaginationComponent } from '../../shared/ui/pagination/pagination.component';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { TitleComponent } from '../../shared/ui/title/title.component';
import { SkeletonComponent } from "./components/skeleton/skeleton.component";

@Component({
  selector: 'main[home]',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ContainerDirective,
    TitleComponent,
    SelectionComponent,
    FilteringByNewestComponent,
    SidemenuComponent,
    ProductCardComponent,
    PaginationComponent,
    SkeletonComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products = products;
  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 20000);
  }
}
