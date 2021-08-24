import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddProductComponent } from '../../components/admin-module/add-product/add-product.component';
import { AdminProductsComponent } from '../../components/admin-module/admin-products/admin-products.component';
import {SharedModule} from "../shared/shared.module";
import { AdminProductCardComponent } from '../../components/admin-module/admin-product-card/admin-product-card.component';


@NgModule({
  declarations: [
    AddProductComponent,
    AdminProductsComponent,
    AdminProductCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
