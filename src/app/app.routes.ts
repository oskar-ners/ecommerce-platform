import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoryProductsViewComponent } from './components/category-products-view/category-products-view.component';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BasketComponent } from './components/basket/basket.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  {
    path: 'homepage/:categoryName',
    component: CategoryProductsViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'homepage/:categoryName/:id',
    component: ProductViewDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'basket', component: BasketComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent },
];
