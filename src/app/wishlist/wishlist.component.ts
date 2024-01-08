import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastServiceService } from '../services/toast-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  allProduct: any = [];
  constructor(private api: ApiService, private toast: ToastServiceService) {}

  ngOnInit(): void {
    this.getwishlist();
  }

  getwishlist() {
    this.api.getwishlist().subscribe((res: any) => {
      this.allProduct = res;
      this.api.getWishcount();
    });
  }
  removeItem(id: any) {
    this.api.deleteWishlist(id).subscribe({
      next: (res: any) => {
        this.getwishlist();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  addtoCart(product: any) {
    if (sessionStorage.getItem('token')) {
      Object.assign(product, { quantity: 1 });
      this.api.addtoCart(product).subscribe({
        next: (res: any) => {
          this.toast.success(res);
          this.removeItem(product._id)
          this.api.getCartCount();

        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.toast.error('Please Login');
    }
  }
}
