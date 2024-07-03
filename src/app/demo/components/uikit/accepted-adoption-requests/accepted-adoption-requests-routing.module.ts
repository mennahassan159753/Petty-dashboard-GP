import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AcceptedAdoptionRequestsComponent } from './accepted-adoption-requests.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AcceptedAdoptionRequestsComponent }
	])],
	exports: [RouterModule]
})
export class AcceptedAdoptionRequestsRoutingModule { }
