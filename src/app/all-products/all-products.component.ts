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
  constructor(private api: ApiService,private toast:ToastServiceService) {}
  ngOnInit(): void {
    this.api.getAllProduct().subscribe((res:any)=>{
      this.allProduct = res
      console.log(res);
    });
  }

  addtoWishList() {
    if (sessionStorage.getItem('token')) {
      this.toast.success('Add Item to wishlist');
    } else {
      alert('Please Login');
    }
  }

  addtoCart() {
    if (sessionStorage.getItem('token')) {
      this.toast.success('Add Item to wishlist');
    } else {
      alert('Please Login');
    }
  }
}
