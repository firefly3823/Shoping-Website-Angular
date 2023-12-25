import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  SERVER_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllProduct() {
    // return this.http.get(`${this.SERVER_URL}/product/all`);
    return this.http.get(`https://api.escuelajs.co/api/v1/products`);
  }

  appendTokenToHeader(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addToWishlistAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/wishlist/add/${id}`,this.appendTokenToHeader())
  }
}
