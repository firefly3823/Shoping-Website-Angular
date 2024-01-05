import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastServiceService } from '../services/toast-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishCount: number = 0;
  allProduct: any = [];
  constructor(private api: ApiService, private toast: ToastServiceService) {}

  ngOnInit(): void {}
  getwishlist() {
    this.api.getwishlist().subscribe((res: any) => {
      this.allProduct = res
    });
  }
}
