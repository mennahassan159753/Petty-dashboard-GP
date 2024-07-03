import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CatsProductsComponent } from './cats-products.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CatsProductsComponent }
	])],
	exports: [RouterModule]
})
export class CatsProductsRoutingModule { }
