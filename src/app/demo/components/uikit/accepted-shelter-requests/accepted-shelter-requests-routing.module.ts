import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AcceptedShelterRequestsComponent } from './accepted-shelter-requests.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AcceptedShelterRequestsComponent }
	])],
	exports: [RouterModule]
})
export class AcceptedShelterRequestsRoutingModule { }
