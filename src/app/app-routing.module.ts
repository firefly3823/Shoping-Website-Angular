import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

//routes
const routes: Routes = [
{path:'',component:AllProductsComponent},
{path:'view/:id',component:ViewproductComponent},
{path:'user/login',component:LoginComponent},
{path:'user/register',component:RegisterComponent},
{path:'user/wishlist',component:WishlistComponent},
{path:'user/cart',component:CartComponent},
{path:'user/checkout',component:CheckoutComponent},
{path:'**',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
