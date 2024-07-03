import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './shelter-requests.component.html',
    providers: [MessageService],

})
export class ShelterRequestsComponent implements OnInit {

    productDialog: boolean = false;

    completeProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: any = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    selectedOrder: any;

    rowsPerPageOptions = [5, 10, 20];
    shelterName: string = ''
    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        // this.productService.getProducts('assets/demo/data/dogs-products.json').then(data => this.products = data);
        this.getShelterData()
        const userName = localStorage.getItem('userName')
        if (userName === 'shelter1') {
            this.shelterName = 'ESMA';
        } else if (userName === 'shelter2') {
            this.shelterName = 'Pets Garden';
        } else if (userName === 'shelter3') {
            this.shelterName = 'ESAF';
        } else if (userName === 'shelter4') {
            this.shelterName = 'SPARE';
        }
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product, message: string) {
        this.product = { ...product, message };
        this.selectedOrder = product;
        this.productDialog = true;

    }



    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Oreder Completed', life: 3000 });
        this.selectedProducts = [];
    }
    confirmAccept() {
        const userName = localStorage.getItem('userName')
        if (userName === 'shelter1') {
            this.accept('accepted-shelter-one-requests.json', 'shelter-one-requests.json');
            this.shelterName = 'ESMA';
        } else if (userName === 'shelter2') {
            this.accept('accepted-shelter-two-requests.json', 'shelter-two-requests.json')
            this.shelterName = 'Pets Garden';
        } else if (userName === 'shelter3') {
            this.accept('accepted-shelter-three-requests.json', 'shelter-three-requests.json')
            this.shelterName = 'ESAF';
        } else if (userName === 'shelter4') {
            this.accept('accepted-shelter-four-requests.json', 'shelter-four-requests.json')
            this.shelterName = 'SPARE';
        }
    }
    accept(jsonFileForAcceptedRequest: string, jsonFileFordeletedRequest: string) {
        this.completeProductDialog = false;
        this.productService.addItemToJSON(jsonFileForAcceptedRequest, this.product, () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Accepted', life: 3000 });
            const productId = this.product.id;
            this.product = {};
            this.productService.deleteItemFromJSON(jsonFileFordeletedRequest, productId, () => {
                this.product = {};
                this.getShelterData();
            });
        });
    }


    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    getShelterData() {
        const userName = localStorage.getItem('userName')
        if (userName === 'shelter1') {
            this.getProducts('shelter-one-requests.json')
        } else if (userName === 'shelter2') {
            this.getProducts('shelter-two-requests.json')

        } else if (userName === 'shelter3') {
            this.getProducts('shelter-three-requests.json')

        } else if (userName === 'shelter4') {
            this.getProducts('shelter-four-requests.json')

        }
    }
    // UTF-8 to Base64 encoding function
    utf8ToBase64(str: string): string {
        const bytes = new TextEncoder().encode(str);
        return btoa(String.fromCharCode(...new Uint8Array(bytes.buffer)));
    }

    // Base64 to UTF-8 decoding function
    base64ToUtf8(str: string): string {
        const bytes = Uint8Array.from(atob(str), c => c.charCodeAt(0));
        return new TextDecoder().decode(bytes);
    }
    getProducts(jsonFile: string) {
        this.products = [];
        this.productService.getAllProducts(jsonFile).subscribe(
            (data: any) => {
                try {
                    const decodedContent = this.base64ToUtf8(data.content);
                    const products = JSON.parse(decodedContent);
                    this.products = products;
                } catch (error) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to show data', life: 3000 });
                }
            },
            error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to show data', life: 3000 });
            }
        );
    }
    completeProduct(product: Product) {
        this.completeProductDialog = true;
        this.product = { ...product };

    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        debugger
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
