import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { PetsComponent } from './pets/pets.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'orders', component: OrdersComponent },
];
