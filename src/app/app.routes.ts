import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoryProductsViewComponent } from './components/category-products-view/category-products-view.component';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { authLoggedInGuard } from './guards/auth-logged-in.guard';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { checkoutSuccessGuard } from './guards/checkout-success.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent, canActivate: [authGuard] },
  {
    path: 'homepage/:categoryName',
    component: CategoryProductsViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'homepage/:categoryName/:id',
    component: ProductViewDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'basket', component: BasketComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authLoggedInGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authLoggedInGuard],
  },
  {
    path: 'checkout-success',
    component: OrderConfirmationComponent,
    canActivate: [authGuard, checkoutSuccessGuard],
  },
  { path: '**', redirectTo: 'register' },
];
