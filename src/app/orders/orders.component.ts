import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersService } from './orders.service';
import { Order, Pet } from '../../lib/types';
import { PetsService } from '../pets/pets.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  newOrder: Order = {
    petId: 0,
    quantity: 1,
    shipDate: '',
    status: '',
    complete: false,
  };

  editingOrder: Order | null = null; // For editing

  pets: Pet[] = []; // For storing pet data

  constructor(
    private ordersService: OrdersService,
    private petService: PetsService
  ) {}

  ngOnInit() {
    this.fetchOrders();
    this.fetchPets();
  }

  fetchOrders() {
    this.ordersService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  fetchPets() {
    this.petService.getPets().subscribe((data) => {
      this.pets = data;
    });
  }

  createOrder() {
    if (!this.newOrder.petId || !this.newOrder.status) {
      alert('Please select a pet and status.');
      return;
    }

    this.ordersService.createOrder(this.newOrder).subscribe(() => {
      this.fetchOrders();
      this.newOrder = {
        petId: 0,
        quantity: 1,
        shipDate: '',
        status: '',
        complete: false,
      };
    });
  }

  deleteOrder(id?: number) {
    this.ordersService.deleteOrder(id).subscribe(() => this.fetchOrders());
  }

  editOrder(order: Order) {
    this.editingOrder = { ...order };
  }

  updateOrder() {
    if (!this.editingOrder || !this.editingOrder.id) return;

    this.ordersService
      .updateOrder(this.editingOrder.id, this.editingOrder)
      .subscribe(() => {
        this.fetchOrders();
        this.editingOrder = null; // Reset editing state
      });
  }

  cancelEdit() {
    this.editingOrder = null;
  }
}
