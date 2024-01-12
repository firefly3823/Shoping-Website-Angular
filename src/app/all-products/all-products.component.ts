import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastServiceService } from '../services/toast-service.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  allProduct: any = [];
  
  constructor(private api: ApiService, private toast: ToastServiceService) {}
  ngOnInit(): void {
    this.api.getAllProduct().subscribe((res: any) => {
      this.allProduct = res;
      // console.log(res);
      // this.allProduct.map((item: any) => console.log(item.images));
    });
  }

  addtoWishList(product: any) {
    if (sessionStorage.getItem('token')) {
      this.api.addToWishlistAPI(product).subscribe({
        next: (res: any) => {
          this.toast.success(`${res.title} Added Item to wishlist`);
          this.api.getWishcount();
        },
        error: (err) => {
          this.toast.warning(err.error);
        },
      });
    } else {
      this.toast.error('Please Login');
    }
  }
  addtoCart(product: any) {
    if (sessionStorage.getItem('token')) {
      Object.assign(product, { quantity: 1 });
      this.api.addtoCart(product).subscribe({
        next: (res: any) => {
          this.toast.success(res);
          this.api.getCartCount();
        },
        error: (err) => {
          console.log(err);
          // this.toast.error(err)
        },
      });
    } else {
      this.toast.error('Please Login');
    }
  }
}