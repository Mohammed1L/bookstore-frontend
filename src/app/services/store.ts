import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StoreLocation {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  private apiUrl = 'https://my-dotnet-backend-123.azurewebsites.net/api/store';

  constructor(private http: HttpClient) {}

  // Basic store info (if needed elsewhere)
  getStoreInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Fetch all stores
  getStores(): Observable<StoreLocation[]> {
    return this.http.get<StoreLocation[]>(`${this.apiUrl}`);
  }

  // Fetch nearest store given coordinates
  getNearestStore(lat: number, lng: number): Observable<StoreLocation> {
    const params = new HttpParams().set('lat', lat).set('lng', lng);
    return this.http.get<StoreLocation>(`${this.apiUrl}/nearest`, { params });
  }
}
