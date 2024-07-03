import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BirdsProductsComponent } from './birds-products.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BirdsProductsComponent }
	])],
	exports: [RouterModule]
})
export class BirdsProductsRoutingModule { }
