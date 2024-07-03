import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './accepted-shelter-requests.component.html',
    providers: [MessageService],

})
export class AcceptedShelterRequestsComponent implements OnInit {

    productDialog: boolean = false;

    completeProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: any[] = [];

    product: any = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    selectedOrder: any;

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        // this.productService.getProducts('assets/demo/data/dogs-products.json').then(data => this.products = data);
        this.getShelterData()

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
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Completed', life: 3000 });
        this.selectedProducts = [];
    }

    confirmComplete() {
        this.completeProductDialog = false;
        this.productService.addItemToJSON('accepted-shelter-requests.json', this.product, () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Completed', life: 3000 });
            this.delete(this.product.id);

        });
    }
    delete(productId: any) {
        // this.products = this.products.filter(product => product.id !== productId);

        this.productService.deleteItemFromJSON('shelter-requests.json', productId, () => {
            this.product = {};
            this.getShelterData();

        });

    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    getShelterData() {
        const userName = localStorage.getItem('userName')
        if (userName === 'shelter1') {
            this.getProducts('accepted-shelter-one-requests.json')
        } else if (userName === 'shelter2') {
            this.getProducts('accepted-shelter-two-requests.json')

        } else if (userName === 'shelter3') {
            this.getProducts('accepted-shelter-three-requests.json')

        } else if (userName === 'shelter4') {
            this.getProducts('accepted-shelter-four-requests.json')

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
                    console.error('Error parsing JSON data:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to parse JSON data', life: 3000 });
                }
            },
            error => {
                console.error('Error fetching JSON data:', error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch JSON data', life: 3000 });
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
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
