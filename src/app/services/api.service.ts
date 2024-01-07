import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  SERVER_URL = 'http://localhost:3000';
  AltServer_url = 'https://api.escuelajs.co/api/v1/products';
  wishlistCount = new BehaviorSubject(0);
  CartCount = new BehaviorSubject(0);
  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('token')) {
      this.getWishcount();
      this.getCartCount();
    }
  }

  getAllProduct() {
    // return this.http.get(`${this.SERVER_URL}/product/all`);
    return this.http.get(this.AltServer_url);
  }
  registerAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/user/register`, user);
  }

  LoginAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/user/login`, user);
  }

  appendTokenToHeader() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    // console.log({headers});
    return { headers };
  }
  addToWishlistAPI(product: any) {
    return this.http.post(
      `${this.SERVER_URL}/wishlist/add`,
      product,
      this.appendTokenToHeader()
    );
  }

  getProduct(id: any) {
    return this.http.get(`${this.AltServer_url}/${id}`);
  }

  getwishlist() {
    return this.http.get(
      `${this.SERVER_URL}/wishlist/get`,
      this.appendTokenToHeader()
    );
  }
  getWishcount() {
    this.getwishlist().subscribe((res: any) => {
      this.wishlistCount.next(res.length);
    });
  }

  deleteWishlist(id: any) {
    return this.http.delete(
      `${this.SERVER_URL}/wishlist/remove/${id}`,
      this.appendTokenToHeader()
    );
  }

  addtoCart(product: any) {
    return this.http.post(
      `${this.SERVER_URL}/cart/add`,
      product,
      this.appendTokenToHeader()
    );
  }

  getCartAPI() {
    return this.http.get(
      `${this.SERVER_URL}/cart/get`,
      this.appendTokenToHeader()
    );
  }
  getCartCount() {
    this.getCartAPI().subscribe((res: any) => {
      this.CartCount.next(res.length);
    });
  }
}
