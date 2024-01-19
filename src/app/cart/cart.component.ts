import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Toast } from 'ngx-toastr';
import { ToastServiceService } from '../services/toast-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  TotalPrice:any = 0;
  constructor(private api: ApiService, private toast: ToastServiceService) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.getCart();
    } else {
      this.cartItems = [];
    }
  }
  getCart() {
    this.api.getCartAPI().subscribe((res: any) => {
      this.cartItems = res;
      this.getCartTotal();
      // console.log(res)
    });
  }
  getCartTotal() {
    if (this.cartItems?.length > 0) {
      this.TotalPrice = Math.ceil(
        this.cartItems
          ?.map((item: any) => item.grandTotal)
          .reduce((amt1: any, amt2: any) => amt1 + amt2)
      );
      sessionStorage.setItem('total',this.TotalPrice)
    }
  }
  incItem(id: any) {
    this.api.cartIncAPI(id).subscribe({
      next: (res: any) => {
        this.getCart();
        this.toast.success(res);
      },
      error: (err) => {
        this.toast.error(err.error);
      },
    });
  }
  decItem(id: any) {
    this.api.cartDecAPI(id).subscribe({
      next: (res: any) => {
        this.getCart();
        this.toast.success(res);
      },
      error: (err) => {
        this.toast.error(err.error);
      },
    });
  }
  delCartItem(id: any) {
    this.api.deleteCartProductAPI(id).subscribe({
      next: (res: any) => {
        this.getCart();
        this.api.getCartCount()
        this.toast.success(res);
      },
      error: (err) => {
        this.toast.error(err.error);
      },
    });
  }
}
