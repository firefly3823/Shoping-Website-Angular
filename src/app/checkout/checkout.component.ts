import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastServiceService } from '../services/toast-service.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  proceedtoByStatus: boolean = false;
  proceedtoPayStatus: boolean = false;
  totalAmount: any = '';
  public payPalConfig?: IPayPalConfig;

  checkoutForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z .]*')]],
    flat: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.:, ]*')]],
    place: ['', [Validators.required, Validators.pattern('[a-zA-Z., ]*')]],
    pincode: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
  });
  constructor(
    private fb: FormBuilder,
    private toast: ToastServiceService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.initConfig();
  }

  cancel() {
    this.checkoutForm.reset();
  }
  proceedToBuy() {
    if (this.checkoutForm.valid) {
      this.proceedtoByStatus = true;
      if (sessionStorage.getItem('total')) {
        this.totalAmount = sessionStorage.getItem('total') || '';
      }
      this.toast.success('Proceed');
    } else {
      this.toast.error('invalid');
    }
  }
  back() {
    this.proceedtoByStatus = false;
  }
  proceedtoPay() {
    this.proceedtoPayStatus = true;
  }

  initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.totalAmount,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.totalAmount,
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization');
        this.api.getCartCount();
        this.toast.success("Payment success")
        this.proceedtoByStatus = false
        this.proceedtoPayStatus = false
        this.checkoutForm.reset()
        this.router.navigateByUrl('/')

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.toast.warning("Trasaction Canceled")
        this.proceedtoPayStatus = false
      },
      onError: (err) => {
        console.log('OnError', err);
        this.toast.error('Trasaction Failed');
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }
}
