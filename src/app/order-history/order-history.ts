import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule,RouterModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css'
})

export class OrderHistory {
orders: any;
selectedOrderId: number | null = null;
orderDetails: any;
   constructor(private http: HttpClient,
    private order: OrderService,
    private route: Router,

  ){
    
  }


  ngOnInit() {
    console.log("is it reaching to order")
  this.order.getOrderAPI().subscribe({
    next: (data) => {
      console.log("This is from order in order comp", data);
      this.orders = data;
    },
    error: (err) => {
       const confirm = window.confirm("Dear user you need to sign in to view order history.")
       if(confirm){
        this.route.navigate(['/login'])
       }
      console.error("Error from the order comp", err)
  }});
}

viewOrderDetails(id : number) {

   this.selectedOrderId = id;

this.order.getOrderById(id).subscribe({
    next: (data)=>{
      this.orderDetails = data;
      console.log("hello from view order ",this.orderDetails)
      

    },
    error: (err) => {console.error(err)}

  })
  
 
}

  }

