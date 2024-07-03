import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompletedOredersComponent } from './completed-oreders.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CompletedOredersComponent }
	])],
	exports: [RouterModule]
})
export class CompletedOredersRoutingModule { }
