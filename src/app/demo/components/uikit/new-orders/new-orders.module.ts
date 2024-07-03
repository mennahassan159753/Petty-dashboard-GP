import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrdersComponent } from './new-orders.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { NewOrdersRoutingModule } from './new-orders-routing.module';

@NgModule({
	imports: [
		CommonModule,
		NewOrdersRoutingModule,
		RippleModule,
		SplitButtonModule,
		ToggleButtonModule,
		TableModule,
		FileUploadModule,
		FormsModule,
		ToastModule,
		ToolbarModule,
		RatingModule,
		InputTextModule,
		InputTextareaModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule
	],
	declarations: [NewOrdersComponent]
})
export class NewOrdersModule { }
