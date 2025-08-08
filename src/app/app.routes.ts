import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Books} from './pages/books/books';
import { BookDetailsComponent } from './pages/book-details/book-details';
import { CategoriesComponent } from './pages/categories/categories';
import { Author } from './author/author';
import { Cart } from './cart/cart';
import { OrderHistory } from './order-history/order-history';
import { AdminComponent } from './admin/admin';
import { AdminGuard } from './guards/admin.guard';
import { StoreMapComponent } from './store-map.component/store-map.component';
export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'books', component: Books },
  { path: 'books/:id', component: BookDetailsComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: "author/:id", component: Author},
  {path:"cart", component: Cart},
  {path:'order',component: OrderHistory},
  {path:'admin',component: AdminComponent, canActivate: [AdminGuard]},
  {path:'map',component:StoreMapComponent},
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  

  
];
