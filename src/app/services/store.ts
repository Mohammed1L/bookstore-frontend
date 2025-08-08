import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
export interface Store {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
@Injectable({ providedIn: 'root' })

export class StoreService {
  private apiUrl = 'http://localhost:5274/api/store'; // adjust if needed

  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }
   getNearestStore(userLat: number, userLng: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/nearest?userLat=${userLat}&userLng=${userLng}`
    );
  }
}
