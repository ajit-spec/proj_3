import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Service1Service} from "../../../services/service1.service";
import {Service2Service} from "../../../services/service2.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  constructor(
    public service1: Service1Service,
    public service2: Service2Service
  ) {
  }

  @Input('cart_item') cart_item: any
  @Output('get_products_from_cart_event') get_products_from_cart_event = new EventEmitter()

  ngOnInit(): void {
  }

  increase_qty(): void {
    this.service1.increase_qty({product_id: this.cart_item._id}).subscribe(value => {
      if (value.status === 1) {
        this.get_products_from_cart_event.emit()
      }
    })
  }

  decrease_qty(): void {
    this.service1.decrease_qty({product_id: this.cart_item._id}).subscribe(value => {
      if (value.status === 1) {
        this.get_products_from_cart_event.emit()
      } else if (value.status === 0) {
        this.service2.openSnackBar(value.msg)
      }
    })
  }

  delete_product_into_cart(): void {
    this.service1.delete_product_into_cart({product_id: this.cart_item._id}).subscribe(value => {
      this.service2.openSnackBar(value.msg)
      if (value.status === 1) {
        this.get_products_from_cart_event.emit()
      }
    })
  }

}
