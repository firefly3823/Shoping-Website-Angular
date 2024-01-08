import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../services/toast-service.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css'],
})
export class ViewproductComponent implements OnInit {
  product: any = {};

  constructor(
    private toast: ToastServiceService,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      // console.log(res);
      const { id } = res;
      //get product of particular ID
      this.getProductDetail(id);
    });
  }
  getProductDetail(id: any) {
    this.api.getProduct(id).subscribe({
      next: (res: any) => {
        this.product = res;
        console.log(this.product);
      },
      error: (err: any) => {
        console.log(err);
      },
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
        },
      });
    } else {
      this.toast.error('Please Login');
    }
  }
}
