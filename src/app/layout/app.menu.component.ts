import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        if (localStorage.getItem('userRole') === 'admin') {
            this.model = [
                {
                    label: 'Admin system',
                    items: [
                        { label: 'Dogs Products', icon: 'pi pi-minus', routerLink: ['/uikit/dogs-products'] },
                        { label: 'Cats Products', icon: 'pi pi-fw pi-minus', routerLink: ['/uikit/cats-products'] },
                        { label: 'Birds Products', icon: 'pi pi-fw pi-minus', routerLink: ['/uikit/birds-products'] },
                        { label: 'Fishes Products', icon: 'pi pi-fw pi-minus', routerLink: ['/uikit/fishes-products'] },
                        { label: 'New Orders', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/uikit/new-orders'] },
                        { label: 'Completed Oreders', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/uikit/completed-oreders'] },
                        { label: 'Adoption Requests', icon: 'pi pi-fw pi-heart-fill', routerLink: ['/uikit/adoption-requests'] },
                        { label: 'Accepted Adoption Requests', icon: 'pi pi-fw pi-check', routerLink: ['/uikit/accepted-adoption-requests'] },
                    ]
                },
                {
                    label: '',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [

                        {
                            label: 'Logout',
                            icon: 'pi pi-fw pi-user',
                            items: [
                                {
                                    label: 'Logout',
                                    icon: 'pi pi-fw pi-sign-in',
                                    routerLink: ['/auth/login']
                                },

                            ]
                        },

                    ]
                },
            ];
        } else if (localStorage.getItem('userRole') === 'shelter') {
            this.model = [
                {
                    label: 'Shelter system',
                    items: [
                        { label: 'Shelter Requests', icon: 'pi pi-fw pi-home', routerLink: ['/uikit/shelter-requests'] },
                        { label: 'Accepted Shelter Requests', icon: 'pi pi-fw pi-check', routerLink: ['/uikit/accepted-shelter-requests'] },
                    ]
                },


                {
                    label: '',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [

                        {
                            label: 'Logout',
                            icon: 'pi pi-fw pi-user',
                            items: [
                                {
                                    label: 'Logout',
                                    icon: 'pi pi-fw pi-sign-in',
                                    routerLink: ['/auth/login']
                                },

                            ]
                        },

                    ]
                },

            ];
        }

    }
}
