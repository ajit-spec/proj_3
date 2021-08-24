import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {Service1Service} from "../../../services/service1.service";
import {Service2Service} from "../../../services/service2.service";

@Component({
  selector: 'app-admin-product-card',
  templateUrl: './admin-product-card.component.html',
  styleUrls: ['./admin-product-card.component.scss']
})
export class AdminProductCardComponent implements OnInit {

  constructor(
    public router: Router,
    public service1: Service1Service,
    public service2: Service2Service
  ) {
  }

  @Input('product') product: any
  @Output('get_products_event') get_products_event = new EventEmitter()

  ngOnInit(): void {
  }

  edit_product(): void {
    this.router.navigate(['/', 'admin', 'add-product'], {queryParams: {product_id: this.product._id}})
  }

  delete_product(): void {
    this.service1.delete_product({product_id: this.product._id}).subscribe(value => {
      this.service2.openSnackBar(value.msg)
      if (value.status === 1) {
        this.get_products_event.emit()
      }
    })
  }

}
