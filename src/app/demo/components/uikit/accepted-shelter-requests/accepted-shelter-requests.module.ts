import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcceptedShelterRequestsComponent } from './accepted-shelter-requests.component';
import { AcceptedShelterRequestsRoutingModule } from './accepted-shelter-requests-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AcceptedShelterRequestsRoutingModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		RatingModule,
		TableModule,
		FileUploadModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		InputTextModule,
		InputTextareaModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule
	],
	declarations: [AcceptedShelterRequestsComponent]
})
export class AcceptedShelterRequestsModule { }
