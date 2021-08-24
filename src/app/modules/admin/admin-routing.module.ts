import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminProductsComponent} from "../../components/admin-module/admin-products/admin-products.component";
import {AddProductComponent} from "../../components/admin-module/add-product/add-product.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-products',
    pathMatch: 'full'
  },
  {
    path: 'all-products',
    component: AdminProductsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
