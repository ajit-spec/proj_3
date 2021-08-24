import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Service4Service} from "./service4.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  // API_URL = 'http://localhost:8080'
  API_URL = 'https://zxcnnginxh.herokuapp.com'

  constructor(
    public http: HttpClient,
    public service4: Service4Service,
    public router: Router
  ) {
  }

  register(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/register`,
      data
    )
  }

  login(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/login`,
      data
    )
  }

  logout(): void {
    localStorage.removeItem('jwt_token')
    this.router.navigate(['/', 'login'])
  }

  get_user_info(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/get_user_info`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  update_profile(data: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/update_user`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }


  change_password(data: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/change_password`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }


  upload_file(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/upload_file`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  get_products(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/get_products`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  edit_product(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/edit_product`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  delete_product(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/delete_product`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  add_product(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/add_product`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  get_single_product(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/get_single_product`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  add_product_into_cart(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/add_product_into_cart`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  delete_product_into_cart(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/delete_product_into_cart`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  increase_qty(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/increase_qty`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  decrease_qty(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/decrease_qty`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  get_products_from_cart(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/get_products_from_cart`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  stripe_payment(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/stripe_payment`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

}
