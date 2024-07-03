import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdoptionRequestsComponent } from './adoption-requests.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AdoptionRequestsComponent }
	])],
	exports: [RouterModule]
})
export class AdoptionRequestsRoutingModule { }
