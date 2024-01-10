import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems:any = []
  constructor(private api:ApiService){}
  ngOnInit(): void {
      if (sessionStorage.getItem('token')) {
        this.getCart()
      } else {
        this.cartItems = []
      }
  }
  getCart(){
    this.api.getCartAPI().subscribe((res:any)=>{
      this.cartItems = res
      console.log(res)
    })
  }
}
