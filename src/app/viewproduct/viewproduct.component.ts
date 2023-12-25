import { Component } from '@angular/core';
import { ToastServiceService } from '../services/toast-service.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css'],
})
export class ViewproductComponent {

  constructor(private toast:ToastServiceService){}
  addtoWishList(product: any) {
    if (sessionStorage.getItem('token')) {
      this.toast.success('Add Item to wishlist');
    } else {
      this.toast.error('Please Login');
    }
  }

  addtoCart(product: any) {
    if (sessionStorage.getItem('token')) {
      this.toast.success('Add Item to wishlist');
    } else {
      this.toast.error('Please Login');
    }
  }
}
