import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface OrderDetail {
  bookId: number;
  price: number;
  quantity: number;
  bookTitle?: string;
  bookImageUrl?: string;
}

export interface RegularOrder {
  id: number;
  total: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'https://my-dotnet-backend-123.azurewebsites.net/api/Order';
  private orderList: OrderDetail[] = [];
  public orderSignal = signal<OrderDetail[]>([]); // always expose a copy

  constructor(private http: HttpClient) {
    this.loadOrder();
  }

  private updateSignal() {
    // expose a shallow copy so outside can't mutate internal array directly
    this.orderSignal.set([...this.orderList]);
  }

  loadOrder() {
    const saved = localStorage.getItem('order');
    this.orderList = saved ? JSON.parse(saved) : [];
    this.updateSignal();
  }

  saveOrder() {
    localStorage.setItem('order', JSON.stringify(this.orderList));
    this.updateSignal();
  }

  clearOrders() {
    this.orderList = [];
    this.updateSignal();
    this.saveOrder();
  }

  getOrders(): OrderDetail[] {
    // return a copy to avoid accidental external mutation
    return [...this.orderList];
  }

  addOrder(item: OrderDetail) {
    const existing = this.orderList.find(o => o.bookId === item.bookId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.orderList.push({ ...item });
    }
    this.saveOrder();
  }

  incrementQuantity(bookId: number, amount = 1) {
    const item = this.orderList.find(o => o.bookId === bookId);
    if (item) {
      item.quantity += amount;
      this.saveOrder();
    }
  }

  decrementQuantity(bookId: number, amount = 1) {
    const item = this.orderList.find(o => o.bookId === bookId);
    if (!item) return;
    item.quantity -= amount;
    if (item.quantity <= 0) {
      this.removeOrder(bookId);
    } else {
      this.saveOrder();
    }
  }

  removeOrder(bookId: number) {
    this.orderList = this.orderList.filter(o => o.bookId !== bookId);
    this.saveOrder();
  }

  // API interactions
  sendOrderAPI(): Observable<OrderDetail[]> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const body = { orderItems: this.orderList };
    return this.http.post<OrderDetail[]>(this.apiUrl, body, { headers });
  }

  addOrderAPI(orders: OrderDetail[]) {
    this.orderList = orders.map(o => ({ ...o }));
    this.updateSignal();
  }

  getOrderById(Id: number): Observable<OrderDetail[]> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<OrderDetail[]>(
      `https://my-dotnet-backend-123.azurewebsites.net/api/Book/by-order/${Id}`,
      { headers }
    );
  }

  getOrderAPI(): Observable<RegularOrder[]> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<RegularOrder[]>(this.apiUrl + '/User', { headers });
  }
}
