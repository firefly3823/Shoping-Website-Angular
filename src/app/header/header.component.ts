import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUserName: string = '';
  wishlistCount:number = 0
  cartCount:number = 0;
  constructor(private toast: ToastServiceService, private router: Router, private api:ApiService) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('username')) {
      // this.currentUserName = sessionStorage.getItem('username')?.split("")[0] || '';
      this.currentUserName = sessionStorage.getItem('username') || '';
      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishlistCount = res
      })
      this.api.CartCount.subscribe((res:any)=>{
        this.cartCount = res
      })
    } else {
      this.currentUserName = '';
    }
  }
  logout() {
    // console.log('LOGOUT');
    this.currentUserName=""
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
