import { Component } from '@angular/core';
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
export class CheckoutComponent {
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

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: '9.99',
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: '9.99',
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                  },
                },
              ],
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
        actions.order.get().then((details:any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
          this.api.getCartCount()
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }
}
