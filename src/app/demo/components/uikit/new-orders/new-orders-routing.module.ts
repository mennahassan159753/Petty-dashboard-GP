import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewOrdersComponent } from './new-orders.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: NewOrdersComponent }
	])],
	exports: [RouterModule]
})
export class NewOrdersRoutingModule { }
