import {Component, OnInit} from '@angular/core';
import {Service1Service} from "../../../services/service1.service";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  constructor(
    public service1: Service1Service
  ) {
  }

  products: any = []

  ngOnInit(): void {
    this.get_products()
  }

  get_products(): void {
    this.service1.get_products().subscribe(value => {
      this.products = value.products
    })
  }

}
