import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { ManageProductsComponent } from './pages/product/manage-products/manage-products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { 
    path: 'product', 
    component: ProductComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'add', component: AddProductComponent },
      { path: 'edit/:id', component: AddProductComponent },
      { path: 'manage', component: ManageProductsComponent },
      { path: ':id', component: ProductDetailsComponent }
    ]
  },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
