import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

@Component({
  selector: 'app-store-map',
  template: `<div id="viewDiv" style="height: 600px; width: 100%;"></div>`,
  styles: []
})
export class StoreMapComponent implements OnInit {
  private map!: Map;
  private view!: MapView;
  private graphicsLayer!: GraphicsLayer;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.map = new Map({
      basemap: 'streets-navigation-vector'
    });

    this.view = new MapView({
      container: 'viewDiv',
      map: this.map,
      center: [49.948, 26.420], // Saudi Arabia center [lon, lat]
      zoom: 6
    });

    this.graphicsLayer = new GraphicsLayer();
    this.map.add(this.graphicsLayer);

    this.storeService.getStores().subscribe(stores => {
      stores.forEach(store => {
        const randomSales = this.getRandomSales(1000, 10000);
        this.addMarker(
          store.longitude,
          store.latitude,
          [0, 0, 255],
          store.name,
          `${store.address}<br><b>Total Sales:</b> $${randomSales.toLocaleString()}`
        );
      });

      this.showUserLocationAndNearestStore();
    });
  }

  private getRandomSales(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private addMarker(lon: number, lat: number, color: number[], title: string, content?: string) {
    const point = new Point({
      longitude: lon,
      latitude: lat
    });

    const symbol = new SimpleMarkerSymbol({
      color: color,
      outline: { color: [255, 255, 255], width: 1 }
    });

    const graphic = new Graphic({
      geometry: point,
      symbol: symbol,
      attributes: { name: title, address: content || '' },
      popupTemplate: {
        title: "{name}",
        content: "{address}"
      }
    });

    this.graphicsLayer.add(graphic);
  }

  private showUserLocationAndNearestStore() {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(position => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      // User location green marker
      this.addMarker(userLng, userLat, [0, 255, 0], 'You are here');

      this.storeService.getNearestStore(userLat, userLng).subscribe(store => {
        if (store) {
          this.addMarker(store.longitude, store.latitude, [255, 0, 0], `Nearest Store: ${store.name}`);
          this.view.goTo({ center: [store.longitude, store.latitude], zoom: 12 });
        }
      });
    }, err => {
      console.error('Error getting user location', err);
    });
  }
}
