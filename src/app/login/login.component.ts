import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });
  constructor(private fb: FormBuilder, private api: ApiService,private toast:ToastServiceService,private router:Router) {}
  login() {
    if (this.loginForm.valid) {
      const password = this.loginForm.value.password;
      const email = this.loginForm.value.email;
      const user = { password, email };
      this.api.LoginAPI(user).subscribe({
        next: (res: any) => {
          this.toast.success(`${res.existingUser.username} Login Successfuly`);
          // console.log(res);
          sessionStorage.setItem('username', res.existingUser.username);
          sessionStorage.setItem('token',res.token)
          this.api.getWishcount()
          this.loginForm.reset();
          this.router.navigateByUrl('');
        },
        error: (data: any) => {
          this.toast.error(data.error);
          this.loginForm.reset();
        },
      });
    } else {
      // console.log(this.loginForm);
      this.toast.warning('invalid form');
    }
  }
}
