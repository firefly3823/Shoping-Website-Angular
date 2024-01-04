import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUserName: string = '';
  constructor(private toast: ToastServiceService, private router: Router) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('username')) {
      // this.currentUserName = sessionStorage.getItem('username')?.split("")[0] || '';
      this.currentUserName = sessionStorage.getItem('username') || '';
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
