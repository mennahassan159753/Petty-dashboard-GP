import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './adoption-requests.component.html',
    providers: [MessageService],

})
export class AdoptionRequestsComponent implements OnInit {

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

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        // this.productService.getProducts('assets/demo/data/dogs-products.json').then(data => this.products = data);
        this.getProducts()
        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
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
        this.completeProductDialog = false;
        debugger
        // Determine the target file based on the language of the object
        const targetFile = (this.isArabic(this.product.fullname) || this.isArabic(this.product.pet_information.description)) ? 'ar-accepted-adoption-requests.json' : 'accepted-adoption-requests.json';

        // Add item to the determined JSON file
        this.productService.addItemToJSON(targetFile, this.product, () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Accepted', life: 3000 });

            // Delete the item from the current JSON file
            const productId = this.product.id;
            this.delete(productId);
        });
    }

    // Helper function to check if the text is Arabic
    isArabic(text: any): boolean {
        const arabicPattern = /[\u0600-\u06FF]/;
        return arabicPattern.test(text);
    }

    delete(productId: any) {
        // this.products = this.products.filter(product => product.id !== productId);

        this.productService.deleteItemFromJSON('adoption-requests.json', productId, () => {
            this.product = {};
            this.getProducts();

        });

    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
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
    getProducts() {
        this.products = [];
        this.productService.getAllProducts('adoption-requests.json').subscribe(
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
