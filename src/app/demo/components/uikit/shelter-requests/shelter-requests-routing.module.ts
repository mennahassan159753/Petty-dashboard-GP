import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShelterRequestsComponent } from './shelter-requests.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ShelterRequestsComponent }
	])],
	exports: [RouterModule]
})
export class ShelterRequestsRoutingModule { }
