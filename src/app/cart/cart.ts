import { HttpClient } from '@angular/common/http';
import { Component, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, OrderDetail } from '../services/order';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart {
  confirmed = signal<boolean>(false);
totalPrice = computed(() => {
    return this.order.orderSignal().reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    );
  });
  constructor(
    private http: HttpClient,
    private order: OrderService,
    private router: Router
  ) {
    // keep localStorage in sync if orderSignal changes (optional side effect)
    effect(() => {
      // reading the signal so effect tracks it
      const current = this.order.orderSignal();
      // nothing needed here unless you want to react; orderService already persists
    });
  }

  get items(): OrderDetail[] {
    return this.order.orderSignal();
  }

  trackByBookId(_: number, item: OrderDetail) {
    return item.bookId;
  }

  increase(item: OrderDetail) {
    this.order.incrementQuantity(item.bookId);
  }

  decrease(item: OrderDetail) {
    this.order.decrementQuantity(item.bookId);
  }

  remove(item: OrderDetail) {
    this.order.removeOrder(item.bookId);
  }

  cancelOrder() {
    const confirmBox = window.confirm('If confirmed items will be lost');
    if (confirmBox) {
      this.order.clearOrders();
      this.router.navigate(['/books']).catch((e) => console.error('Nav failed:', e));
    }
  }

  confirmOrder() {
    console.log(' is there a token ' + localStorage.getItem('token'));

    if (localStorage.getItem('token')) {
      this.order.sendOrderAPI().subscribe({
        next: (data) => {
          this.order.clearOrders();
          this.order.addOrderAPI(data);
          this.confirmed.set(true);
          console.log('Order Items:', data);
        },
        error: (err) => {
          if (err.status === 401) {
            localStorage.removeItem('token');
          }
        },
      });
    } else {
      const confirmBox = window.confirm(
        'Dear user you need to sign in to place order.'
      );
      if (confirmBox) {
        this.router.navigate(['/login']).catch((e) => console.error('Nav failed:', e));
      }
    }
  }

  goToOrderHistory() {
    this.router.navigate(['/order']).catch((e) => console.error('Nav failed:', e));
  }
}