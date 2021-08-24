import {Component, OnInit} from '@angular/core';
import {Service1Service} from "../../../services/service1.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  constructor(
    public service1: Service1Service
  ) {
  }

  products: any = []

  ngOnInit(): void {
    this.service1.get_products().subscribe(value => {
      this.products = value.products
    })
  }

}
