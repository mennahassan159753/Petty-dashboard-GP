import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService],

})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    username: string = '';
    selectedRole: string = 'admin';

    password!: string;
    showErrorMessage: boolean = false;

    constructor(public layoutService: LayoutService, private router: Router, private messageService: MessageService
    ) { }
    signIn() {
        if (this.username === 'menna' && this.password === '123456' && this.selectedRole === 'admin') {
            localStorage.setItem('userRole', this.selectedRole)
            this.router.navigate(['/uikit/dogs-products']);
        } else if (this.username === 'shelter1' && this.password === '123456' && this.selectedRole === 'shelter') {
            localStorage.setItem('userRole', this.selectedRole);
            localStorage.setItem('userName', this.username);
            this.router.navigate(['/uikit/shelter-requests']);
        } else if (this.username === 'shelter2' && this.password === '123456' && this.selectedRole === 'shelter') {
            localStorage.setItem('userRole', this.selectedRole);
            localStorage.setItem('userName', this.username);
            this.router.navigate(['/uikit/shelter-requests']);
        } else if (this.username === 'shelter3' && this.password === '123456' && this.selectedRole === 'shelter') {
            localStorage.setItem('userRole', this.selectedRole);
            localStorage.setItem('userName', this.username);
            this.router.navigate(['/uikit/shelter-requests']);
        } else if (this.username === 'shelter4' && this.password === '123456' && this.selectedRole === 'shelter') {
            localStorage.setItem('userRole', this.selectedRole);
            localStorage.setItem('userName', this.username);
            this.router.navigate(['/uikit/shelter-requests']);
        } else {
            this.showErrorMessage = true; // Set showErrorMessage to true to display the error box
            setTimeout(() => {
                this.showErrorMessage = false; // Hide the error box after 3 seconds
            }, 3000);

        }
    }
}
