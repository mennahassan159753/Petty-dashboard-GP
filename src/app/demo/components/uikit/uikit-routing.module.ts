import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'new-orders', data: { breadcrumb: 'newOrders' }, loadChildren: () => import('./new-orders/new-orders.module').then(m => m.NewOrdersModule) },
        { path: 'birds-products', data: { breadcrumb: 'Birds Products' }, loadChildren: () => import('./birds-products/birds-products.module').then(m => m.BirdsProductsModule) },
        { path: 'dogs-products', data: { breadcrumb: 'dogs products' }, loadChildren: () => import('./dog-products/dog-products.module').then(m => m.DogProductsModule) },
        { path: 'cats-products', data: { breadcrumb: 'cats products' }, loadChildren: () => import('./cats-products/cats-products.module').then(m => m.CatsProductsModule) },
        { path: 'fishes-products', data: { breadcrumb: 'fishes products' }, loadChildren: () => import('./fishes-products/fishes-products.module').then(m => m.FishesProductsModule) },
        { path: 'adoption-requests', data: { breadcrumb: 'List' }, loadChildren: () => import('./adoption-requests/adoption-requests.module').then(m => m.AdoptionRequestsModule) },
        { path: 'completed-oreders', data: { breadcrumb: 'completed oreders' }, loadChildren: () => import('./completed-oreders/completed-oreders.module').then(m => m.CompletedOredersModule) },
        { path: 'accepted-adoption-requests', data: { breadcrumb: 'accepted-adoption-requests' }, loadChildren: () => import('./accepted-adoption-requests/accepted-adoption-requests.module').then(m => m.AcceptedAdoptionRequestsModule) },
        { path: 'shelter-requests', data: { breadcrumb: 'Shelter' }, loadChildren: () => import('./shelter-requests/shelter-requests.module').then(m => m.ShelterRequestsModule) },
        { path: 'accepted-shelter-requests', data: { breadcrumb: 'accepted-shelter-requests' }, loadChildren: () => import('./accepted-shelter-requests/accepted-shelter-requests.module').then(m => m.AcceptedShelterRequestsModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
