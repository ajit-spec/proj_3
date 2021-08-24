import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsListComponent } from '../../components/product-module/products-list/products-list.component';
import { ProductCardComponent } from '../../components/product-module/product-card/product-card.component';
import {SharedModule} from "../shared/shared.module";
import { CartComponent } from '../../components/product-module/cart/cart.component';
import { CartItemComponent } from '../../components/product-module/cart-item/cart-item.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductCardComponent,
    CartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
