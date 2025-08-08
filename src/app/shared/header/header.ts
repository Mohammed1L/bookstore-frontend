import { Component } from '@angular/core';
import { OrderService } from '../../services/order';
import { RouterModule } from '@angular/router';
import { signal , computed} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponenet {
   items: any[] = [];
   showProfileDropdown = false;
   searchQuery: string = '';
   logIn = false;

   public signalItems = computed(()=> this.order.orderSignal().length)
   
   constructor(public order: OrderService, private route: Router) {
   }

    ngOnInit(){
      this.order.orderSignal
      if(localStorage.getItem("token")){
        this.logIn = true;
      }
      
     
    console.log("This is from header",this.items)
  }

  
  onCartClick(){
    console.log("Cart is clciked" + this.signalItems)
    
    
   
    this.order.saveOrder();
    this.route.navigate(['/cart']);
   
    

  }
  onSearch() {
    if (this.searchQuery.trim()) {
      // Navigate to books page with search query
      this.route.navigate(['/books'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
    }
  }
  onProfileClick(){
    this.showProfileDropdown = !this.showProfileDropdown;
    

  }
  onOrdersClick(){
    console.log('Clicked: Navigating to /cart');
 
      this.route.navigate(['/order'])

  }

  onAdminClick(){
    console.log('Clicked: Navigating to /admin');
    this.route.navigate(['/admin']);
  }


onLogoutClick(){
  localStorage.removeItem('token');
  sessionStorage.clear();

  
  this.route.navigate(['/login']);

}
onMapClick(){
  this.route.navigate(['/map']);
}

onLoginClick(){
 this.logIn = true;
  this.route.navigate(['/login']);

}
  


  

}
