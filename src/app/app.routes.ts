import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoryProductsViewComponent } from './components/category-products-view/category-products-view.component';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BasketComponent } from './components/basket/basket.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'homepage/:categoryName', component: CategoryProductsViewComponent },
  {
    path: 'homepage/:categoryName/:id',
    component: ProductViewDetailsComponent,
  },
  { path: 'basket', component: BasketComponent },
  { path: '**', component: PageNotFoundComponent },
];
