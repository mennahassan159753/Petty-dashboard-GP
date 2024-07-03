import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DogProductsComponent } from './dog-products.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DogProductsComponent }
	])],
	exports: [RouterModule]
})
export class DogProductsRoutingModule { }
