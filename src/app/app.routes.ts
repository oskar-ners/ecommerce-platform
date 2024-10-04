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
import { ProfileComponent } from './components/profile/profile.component';
import { ProductsListingComponent } from './components/products-listing/products-listing.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

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
  {
    path: 'products-listing',
    component: ProductsListingComponent,
    canActivate: [authGuard],
  },
  { path: 'basket', component: BasketComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard] },
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
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'checkout-success',
    component: OrderConfirmationComponent,
    canActivate: [authGuard, checkoutSuccessGuard],
  },
  { path: '**', redirectTo: 'register' },
];
