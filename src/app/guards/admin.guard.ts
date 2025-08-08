import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    // For now, we'll allow access to admin dashboard
    // In a real application, you would check if the user is an admin
    // This could be done by checking a JWT token, user role, etc.
    
    // Example: Check if user is logged in and has admin role
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin) {
      // You could redirect to login or show an error message
      console.warn('Access denied: Admin privileges required');
      // this.router.navigate(['/login']);
      // return false;
    }
    
    return true; // Allow access for now
  }
} 