import {Component, Input, OnInit} from '@angular/core';
import {Service1Service} from "../../../services/service1.service";
import {Service2Service} from "../../../services/service2.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor(
    public service1: Service1Service,
    public service2: Service2Service
  ) {
  }

  @Input('product') product: any

  ngOnInit(): void {
  }

  add_product_into_cart(): void {
    this.service1.add_product_into_cart({product_id: this.product._id}).subscribe(value => {
      this.service2.openSnackBar(value.msg)
    })
  }

}
