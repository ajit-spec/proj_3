import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service1Service} from "../../../services/service1.service";
import {Service2Service} from "../../../services/service2.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    public service1: Service1Service,
    public service2: Service2Service,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
  }

  form = this.formbuilder.group(
    {
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
    }
  )

  isedit = false
  product_id = null

  getformcontrols(): any {
    return this.form.controls
  }

  geterrormsgforname(): any {
    const name = this.getformcontrols().name
    if (name.hasError('required')) {
      return 'name is req';
    }
  }

  geterrormsgfordescription(): any {
    const description = this.getformcontrols().description
    if (description.hasError('required')) {
      return 'description is req';
    }
  }

  geterrormsgforprice(): any {
    const price = this.getformcontrols().price
    if (price.hasError('required')) {
      return 'price is req';
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(value => {
      if (value.product_id) {
        this.product_id = value.product_id
        this.isedit = true
        this.service1.get_single_product({product_id: this.product_id}).subscribe(value1 => {
          if (value1.status === 1) {
            this.form.patchValue(
              {
                name: value1.product.name,
                description: value1.product.description,
                price: value1.product.price
              }
            )
          }
        })
      }
    })
  }

  submit(): void {
    if (this.form.invalid) {
      return
    }

    if (this.isedit) {
      const request = {
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
        price: this.form.get('price')?.value,
        product_id: this.product_id
      }

      this.service1.edit_product(request).subscribe(value => {
        this.service2.openSnackBar(value.msg)
        if (value.status === 1) {
          setTimeout(() => {
            this.router.navigate(['/', 'admin'])
          }, 3000)
        }
      })
    } else {
      const request = {
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
        price: this.form.get('price')?.value
      }

      this.service1.add_product(request).subscribe(value => {
        this.service2.openSnackBar(value.msg)
        if (value.status === 1) {
          setTimeout(() => {
            this.router.navigate(['/', 'admin'])
          }, 3000)
        }
      })
    }


  }

}
