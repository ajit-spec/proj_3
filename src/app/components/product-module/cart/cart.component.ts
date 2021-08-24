import {Component, OnInit} from '@angular/core';
import {Service1Service} from "../../../services/service1.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Service2Service} from "../../../services/service2.service";
import {Service3Service} from "../../../services/service3.service";

import {StripeService} from "ngx-stripe";
import {
  StripeElements,
  StripeCardElement,
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public service1: Service1Service,
    public formbuilder: FormBuilder,
    public service2: Service2Service,
    public service3: Service3Service,
    private stripeService: StripeService,
    public router: Router
  ) {
  }

  carts: any = []
  cart_msg = ''
  total_amt = 0;

  elements: any;
  card: any;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeform = this.formbuilder.group(
    {
      name: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, this.service3.checkvalidemail])],
      phone: ['', Validators.compose([Validators.required, this.service3.checkvalidphone])],
    }
  )

  createToken() {

    if (this.stripeform.invalid) {
      return
    }

    const name = this.stripeform.get('name')?.value;
    const location = this.stripeform.get('location')?.value;
    const email = this.stripeform.get('email')?.value;
    const phone = this.stripeform.get('phone')?.value;
    this.stripeService
      .createToken(this.card, {name})
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
          const token_id = result.token.id

          const request = {
            name,
            location,
            email,
            phone,
            token_id
          }

          this.service1.stripe_payment(request).subscribe(value => {
            this.service2.openSnackBar(value.msg)
            if (value.status === 1) {
              this.router.navigate(['/', 'product'])
            }
          })

        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          this.service2.openSnackBar(result.error.message as string)
        }
      });
  }

  getformcontrols(): any {
    return this.stripeform.controls
  }

  geterrormsgforname(): any {
    const name = this.getformcontrols().name
    if (name.hasError('required')) {
      return 'name is req';
    }
  }

  geterrormsgforlocation(): any {
    const location = this.getformcontrols().location
    if (location.hasError('required')) {
      return 'location is req';
    }
  }

  geterrormsgforemail(): any {
    const email = this.getformcontrols().email
    if (email.hasError('required')) {
      return 'email is req';
    } else if (email.hasError('notvalidemail')) {
      return 'email is not valid';
    }
  }

  geterrormsgforphone(): any {
    const phone = this.getformcontrols().phone
    if (phone.hasError('required')) {
      return 'phone is req';
    } else if (phone.hasError('notvalidphone')) {
      return 'phone is not valid';
    }
  }


  ngOnInit(): void {
    this.get_products_from_cart()

    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', this.cardOptions);
          this.card.mount('#card-element');
        }
      });
  }

  get_products_from_cart(): void {
    this.service1.get_products_from_cart().subscribe(value => {
      if (value.status === 1) {
        this.total_amt = 0
        this.carts = value.products_list
        this.carts.forEach((value: any) => {
          this.total_amt += (value.qty * value.price)
        })
      } else if (value.status === 0) {
        this.carts = []
        this.cart_msg = value.msg
      }
      console.log(value)
    })
  }

}
