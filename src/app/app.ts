import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponenet } from './shared/header/header';
import { FooterComponent } from './shared/footer/footer';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponenet, FooterComponent, RouterModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private router: Router) {}

 isAuthRoute(): boolean {
  const currentPath = this.router.url.split('?')[0]; // remove query params
  return ['/login', '/register'].includes(currentPath);
}
}
