import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FishesProductsComponent } from './fishes-products.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FishesProductsComponent }
	])],
	exports: [RouterModule]
})
export class FishesProductsRoutingModule { }
